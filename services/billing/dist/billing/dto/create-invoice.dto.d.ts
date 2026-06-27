import { InvoiceStatus, PaymentMethod } from "../entities/billing.entity";
export declare class CreateInvoiceDto {
    patientId: string;
    doctorId: string;
    appointmentId?: string;
    amount: number;
    description?: string;
}
export declare class UpdateInvoiceDto {
    description?: string;
    status?: InvoiceStatus;
}
export declare class ProcessPaymentDto {
    method: PaymentMethod;
    transactionId: string;
    amount: number;
}
