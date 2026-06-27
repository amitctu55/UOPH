import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsController } from "./analytics.controller";
import { BookingAnalyticsEntity } from "./entities/booking-analytics.entity";
import { UserAnalyticsEntity } from "./entities/user-analytics.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookingAnalyticsEntity, UserAnalyticsEntity])],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
