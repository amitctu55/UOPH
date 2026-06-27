import { PaymentMethod } from "../entities/billing.entity";
export declare class ProcessPaymentDto {
    method: PaymentMethod;
    transactionId: string;
    amount: number;
}
