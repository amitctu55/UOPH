import { Injectable, Logger, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  InvoiceEntity,
  PaymentEntity,
  WalletEntity,
  InvoiceStatus,
  PaymentStatus,
  PaymentMethod,
} from "./entities/billing.entity";

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>
  ) {}

  async createInvoice(
    patientId: string,
    doctorId: string,
    appointmentId: string,
    amount: number,
    description: string
  ): Promise<InvoiceEntity> {
    try {
      const invoiceNumber = `INV-${Date.now()}`;
      const tax = amount * 0.18; // 18% GST
      const totalAmount = amount + tax;

      const invoice = this.invoiceRepository.create({
        patientId,
        doctorId,
        appointmentId,
        invoiceNumber,
        amount,
        tax,
        totalAmount,
        description,
        status: InvoiceStatus.DRAFT,
        lineItems: [
          {
            description: "Consultation Fee",
            quantity: 1,
            unitPrice: amount,
            amount,
          },
        ],
      });

      return await this.invoiceRepository.save(invoice);
    } catch (error) {
      this.logger.error(`Error creating invoice: ${error.message}`);
      throw error;
    }
  }

  async getInvoice(invoiceId: string): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id: invoiceId },
    });

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }

    return invoice;
  }

  async getPatientInvoices(patientId: string): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.find({
      where: { patientId },
      order: { createdAt: "DESC" },
    });
  }

  async issueInvoice(invoiceId: string): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id: invoiceId },
    });

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }

    if (invoice.status !== InvoiceStatus.DRAFT) {
      throw new BadRequestException("Only draft invoices can be issued");
    }

    invoice.status = InvoiceStatus.ISSUED;
    invoice.issueDate = new Date();
    invoice.dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    return await this.invoiceRepository.save(invoice);
  }

  async recordPayment(
    invoiceId: string,
    amount: number,
    method: PaymentMethod,
    transactionId: string
  ): Promise<PaymentEntity> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id: invoiceId },
    });

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }

    const payment = this.paymentRepository.create({
      invoiceId,
      patientId: invoice.patientId,
      amount,
      method,
      transactionId,
      status: PaymentStatus.PROCESSING,
    });

    const saved = await this.paymentRepository.save(payment);

    // Mark as completed
    saved.status = PaymentStatus.COMPLETED;
    saved.processedAt = new Date();
    await this.paymentRepository.save(saved);

    // Update invoice
    invoice.status = InvoiceStatus.PAID;
    invoice.paidDate = new Date();
    await this.invoiceRepository.save(invoice);

    return saved;
  }

  async getWallet(userId: string): Promise<WalletEntity> {
    let wallet = await this.walletRepository.findOne({
      where: { userId },
    });

    if (!wallet) {
      wallet = this.walletRepository.create({ userId, balance: 0 });
      wallet = await this.walletRepository.save(wallet);
    }

    return wallet;
  }

  async addToWallet(userId: string, amount: number): Promise<WalletEntity> {
    const wallet = await this.getWallet(userId);

    wallet.balance = Number((Number(wallet.balance) + amount).toFixed(2));
    wallet.transactionCount += 1;
    wallet.lastTransactionAt = new Date();

    return await this.walletRepository.save(wallet);
  }

  async deductFromWallet(userId: string, amount: number): Promise<WalletEntity> {
    const wallet = await this.getWallet(userId);

    if (Number(wallet.balance) < amount) {
      throw new BadRequestException("Insufficient wallet balance");
    }

    wallet.balance = Number((Number(wallet.balance) - amount).toFixed(2));
    wallet.transactionCount += 1;
    wallet.lastTransactionAt = new Date();

    return await this.walletRepository.save(wallet);
  }

  async getPaymentHistory(patientId: string): Promise<PaymentEntity[]> {
    return this.paymentRepository.find({
      where: { patientId },
      order: { createdAt: "DESC" },
    });
  }
}
