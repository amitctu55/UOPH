import { PartialType } from "@nestjs/mapped-types";
import { CreateClinicalChartingDataDto } from "./create-clinical-charting.dto";

export class UpdateClinicalChartingDataDto extends PartialType(CreateClinicalChartingDataDto) {}