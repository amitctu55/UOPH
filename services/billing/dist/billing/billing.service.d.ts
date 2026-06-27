import { Repository } from "typeorm";
import { InvoiceEntity, PaymentEntity, WalletEntity, PaymentMethod } from "./entities/billing.entity";
export declare class BillingService {
    private readonly invoiceRepository;
    private readonly paymentRepository;
    private readonly walletRepository;
    private readonly logger;
    constructor(invoiceRepository: Repository<InvoiceEntity>, paymentRepository: Repository<PaymentEntity>, walletRepository: Repository<WalletEntity>);
    createInvoice(patientId: string, doctorId: string, appointmentId: string, amount: number, description: string): Promise<InvoiceEntity>;
    getInvoice(invoiceId: string): Promise<InvoiceEntity>;
    getPatientInvoices(patientId: string): Promise<InvoiceEntity[]>;
    issueInvoice(invoiceId: string): Promise<InvoiceEntity>;
    recordPayment(invoiceId: string, amount: number, method: PaymentMethod, transactionId: string): Promise<PaymentEntity>;
    getWallet(userId: string): Promise<WalletEntity>;
    addToWallet(userId: string, amount: number): Promise<WalletEntity>;
    deductFromWallet(userId: string, amount: number): Promise<WalletEntity>;
    getPaymentHistory(patientId: string): Promise<PaymentEntity[]>;
}
