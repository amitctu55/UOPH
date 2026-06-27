export declare enum InvoiceStatus {
    DRAFT = "draft",
    ISSUED = "issued",
    PENDING = "pending",
    PAID = "paid",
    OVERDUE = "overdue",
    CANCELLED = "cancelled"
}
export declare enum PaymentStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed",
    REFUNDED = "refunded"
}
export declare enum PaymentMethod {
    CREDIT_CARD = "credit_card",
    DEBIT_CARD = "debit_card",
    UPI = "upi",
    NET_BANKING = "net_banking",
    WALLET = "wallet",
    BANK_TRANSFER = "bank_transfer"
}
export declare class InvoiceEntity {
    id: string;
    patientId: string;
    doctorId: string;
    appointmentId: string;
    invoiceNumber: string;
    status: InvoiceStatus;
    amount: number;
    tax: number;
    discount: number;
    totalAmount: number;
    description: string;
    issueDate: Date;
    dueDate: Date;
    paidDate: Date;
    lineItems: Array<{
        description: string;
        quantity: number;
        unitPrice: number;
        amount: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PaymentEntity {
    id: string;
    invoiceId: string;
    patientId: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId: string;
    reference: string;
    processedAt: Date;
    failureReason: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
export declare class WalletEntity {
    id: string;
    userId: string;
    balance: number;
    transactionCount: number;
    lastTransactionAt: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
