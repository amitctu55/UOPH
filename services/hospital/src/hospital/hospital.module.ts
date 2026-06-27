import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HospitalEntity } from "./entities/hospital.entity";
import { HospitalService } from "./hospital.service";
import { HospitalController } from "./hospital.controller";

@Module({
  imports: [TypeOrmModule.forFeature([HospitalEntity])],
  providers: [HospitalService],
  controllers: [HospitalController],
  exports: [HospitalService],
})
export class HospitalModule {}
