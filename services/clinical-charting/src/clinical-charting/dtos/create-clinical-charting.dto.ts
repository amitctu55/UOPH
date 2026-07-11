import { IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ClinicalDataType } from "../entities/clinical-charting.entity";

export class CreateClinicalChartingDataDto {
  @IsUUID()
  patientId: string;

  @IsUUID()
  providerId: string;

  @IsEnum(ClinicalDataType)
  clinicalDataType: ClinicalDataType;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => Object)
  data: Record<string, any>;

  @IsOptional()
  encounteredAt?: Date;
}

export class UpdateClinicalChartingDataDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => Object)
  @IsOptional()
  data?: Record<string, any>;

  @IsOptional()
  encounteredAt?: Date;

  @IsOptional()
  isActive?: boolean;
}