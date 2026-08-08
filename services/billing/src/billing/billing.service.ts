import { Injectable, Logger, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Invoice,
  InvoiceDocument,
  Payment,
  PaymentDocument,
  Wallet,
  WalletDocument,
  WalletTransaction,
  WalletTransactionDocument,
} from "../../../../libs/shared/src/database/billing.model";

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
    @InjectModel(WalletTransaction.name)
    private readonly walletTransactionModel: Model<WalletTransactionDocument>
  ) {}

  async createInvoice(
    patientId: string,
    doctorId: string,
    appointmentId: string | undefined,
    amount: number,
    description: string | undefined
  ): Promise<Invoice> {
    try {
      const invoiceNumber = `INV-${Date.now()}`;
      const tax = amount * 0.18; // 18% GST
      const totalAmount = amount + tax;

      const invoice = new this.invoiceModel({
        patientId,
        doctorId: doctorId || undefined,
        appointmentId: appointmentId || undefined,
        invoiceNumber,
        amount,
        tax: Math.round(tax * 100) / 100, // Round to 2 decimal places
        totalAmount: Math.round(totalAmount * 100) / 100,
        description,
        status: "unpaid",
      });

      return await invoice.save();
    } catch (error: any) {
      this.logger.error(`Error creating invoice: ${error.message}`);
      throw error;
    }
  }

  async getInvoice(invoiceId: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(invoiceId);

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }

    return invoice;
  }

  async getPatientInvoices(patientId: string): Promise<Invoice[]> {
    return this.invoiceModel.find({ patientId }).sort({ createdAt: -1 }).exec();
  }

  async issueInvoice(invoiceId: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(invoiceId);

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }

    if (invoice.status !== "unpaid") {
      throw new BadRequestException("Only unpaid invoices can be issued");
    }

    // For our workflow, issuing an invoice means it's now partially paid (awaiting payment)
    // In a real system, you might have different states like 'issued', 'sent', etc.
    // But based on the Mongoose schema, we only have: unpaid, partially_paid, paid
    invoice.status = "partially_paid";
    invoice.issueDate = new Date();
    invoice.dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    return await invoice.save();
  }

  async recordPayment(
    invoiceId: string,
    amount: number,
    method: string,
    transactionId: string
  ): Promise<Payment> {
    const invoice = await this.invoiceModel.findById(invoiceId);

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }

    const payment = new this.paymentModel({
      billId: invoice._id,
      amount,
      paymentMethod: method,
      transactionId,
      status: "pending", // Initial status before processing
    });

    const saved = await payment.save();

    // Mark as completed
    const paidPayment = await this.paymentModel.findByIdAndUpdate(
      saved._id,
      { status: "completed", paidAt: new Date() },
      { new: true }
    );

    if (!paidPayment) {
      throw new NotFoundException("Payment not found after update");
    }

    // Update invoice
    invoice.status = "paid";
    await invoice.save();

    return paidPayment;
  }

  async getWallet(userId: string): Promise<Wallet> {
    let wallet = await this.walletModel.findOne({ patientId: userId });

    if (!wallet) {
      wallet = new this.walletModel({ patientId: userId, balance: 0 });
      wallet = await wallet.save();
    }

    return wallet;
  }

  async addToWallet(userId: string, amount: number): Promise<Wallet> {
    let wallet = await this.walletModel.findOne({ patientId: userId });

    if (!wallet) {
      wallet = new this.walletModel({ patientId: userId, balance: 0 });
    }

    wallet.balance = Number((Number(wallet.balance) + amount).toFixed(2));

    // Create transaction record
    const transaction = new this.walletTransactionModel({
      walletId: wallet._id,
      transactionType: "credit",
      amount,
      description: "Funds added to wallet",
    });

    await transaction.save();

    wallet = await wallet.save();
    return wallet;
  }

  async deductFromWallet(userId: string, amount: number): Promise<Wallet> {
    let wallet = await this.walletModel.findOne({ patientId: userId });

    if (!wallet) {
      wallet = new this.walletModel({ patientId: userId, balance: 0 });
    }

    if (Number(wallet.balance) < amount) {
      throw new BadRequestException("Insufficient wallet balance");
    }

    wallet.balance = Number((Number(wallet.balance) - amount).toFixed(2));

    // Create transaction record
    const transaction = new this.walletTransactionModel({
      walletId: wallet._id,
      transactionType: "debit",
      amount,
      description: "Payment from wallet",
    });

    await transaction.save();

    wallet = await wallet.save();
    return wallet;
  }

  async getPaymentHistory(patientId: string): Promise<Payment[]> {
    // First get invoices for this patient
    const invoices = await this.invoiceModel.find({ patientId }).select("_id").exec();
    const invoiceIds = invoices.map(invoice => invoice._id);

    // Then get payments for those invoices
    return this.paymentModel
      .find({ billId: { $in: invoiceIds } })
      .sort({ createdAt: -1 })
      .exec();
  }
}
