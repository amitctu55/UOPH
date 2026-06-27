import { BillingService } from "./billing.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { ProcessPaymentDto } from "./dto/process-payment.dto";
import { InvoiceEntity } from "./entities/billing.entity";
export declare class BillingController {
    private readonly billingService;
    constructor(billingService: BillingService);
    createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceEntity>;
    getInvoice(invoiceId: string): Promise<InvoiceEntity>;
    getPatientInvoices(patientId: string): Promise<InvoiceEntity[]>;
    issueInvoice(invoiceId: string): Promise<InvoiceEntity>;
    recordPayment(invoiceId: string, processPaymentDto: ProcessPaymentDto): Promise<any>;
    getWallet(userId: string): Promise<any>;
    addToWallet(userId: string, amount: number): Promise<any>;
    deductFromWallet(userId: string, amount: number): Promise<any>;
    getPaymentHistory(patientId: string): Promise<any[]>;
}
