import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { BillingModule } from "./billing/billing.module";
import { TerminusModule } from "@nestjs/terminus";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || "development"}`,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/upchar_billing'),
    BillingModule,
    TerminusModule,
  ],
})
export class AppModule {}