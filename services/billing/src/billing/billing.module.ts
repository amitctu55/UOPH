import { Module } from "@nestjs/common";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvoiceEntity, PaymentEntity, WalletEntity } from "./entities/billing.entity";

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity, PaymentEntity, WalletEntity])],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
