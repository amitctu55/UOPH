import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { RecordType } from "../entities/medical-record.entity";

export class CreateMedicalRecordDto {
  @IsNotEmpty()
  patientId: string;

  @IsNotEmpty()
  doctorId: string;

  @IsNotEmpty()
  @IsEnum(RecordType)
  recordType: RecordType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsUrl()
  fileUrl: string;

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsOptional()
  mimeType?: string;

  @IsOptional()
  fileSizeBytes?: number;

  @IsOptional()
  recordDate?: Date;
}
