import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClinicalChartingEntity } from "./entities/clinical-charting.entity";
import { ClinicalChartingService } from "./services/clinical-charting.service";
import { ClinicalChartingController } from "./controllers/clinical-charting.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalChartingEntity])],
  controllers: [ClinicalChartingController],
  providers: [ClinicalChartingService],
  exports: [ClinicalChartingService], // Export for use in other modules
})
export class ClinicalChartingModule {}