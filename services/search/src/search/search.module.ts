import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { HospitalEntity } from "../hospital/src/hospital/entities/hospital.entity";
import { DoctorEntity } from "../doctor/src/doctor/entities/doctor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([HospitalEntity, DoctorEntity])],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
