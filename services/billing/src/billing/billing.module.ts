import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";
import {
  InvoiceSchema,
  PaymentSchema,
  WalletSchema,
  WalletTransactionSchema,
} from "../../../../libs/shared/src/database/billing.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Invoice", schema: InvoiceSchema },
      { name: "Payment", schema: PaymentSchema },
      { name: "Wallet", schema: WalletSchema },
      { name: "WalletTransaction", schema: WalletTransactionSchema },
    ]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
