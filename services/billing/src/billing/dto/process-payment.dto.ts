import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { PaymentMethod } from "../entities/billing.entity";

export class ProcessPaymentDto {
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;
}
