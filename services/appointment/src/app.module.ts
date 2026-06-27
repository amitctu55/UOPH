import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentController } from "./appointment/appointment.controller";
import { AppointmentService } from "./appointment/appointment.service";
import { AppointmentEntity } from "./appointment/entities/appointment.entity";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || "development"}`,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || "5432"),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [AppointmentEntity],
      synchronize: false, // Use migrations instead
      logging: process.env.NODE_ENV === "development",
    }),
    TypeOrmModule.forFeature([AppointmentEntity]),
    ScheduleModule.forRoot(),
    HealthModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppModule {}
