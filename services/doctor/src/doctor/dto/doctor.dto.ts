import {
  IsUUID,
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  Max,
  Min,
  IsDecimal,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { DoctorSpecialization } from "../entities/doctor.entity";

export class CreateDoctorDto {
  @ApiProperty()
  @IsUUID()
  userId!: string;

  @ApiProperty()
  @IsUUID()
  hospitalId!: string;

  @ApiProperty()
  @IsString()
  licenseNumber!: string;

  @ApiProperty({ enum: DoctorSpecialization })
  @IsEnum(DoctorSpecialization)
  specialization!: DoctorSpecialization;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  qualifications?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiProperty()
  @IsNumber()
  yearsOfExperience!: number;

  @ApiProperty()
  @IsNumber()
  consultationFee!: number;

  @ApiProperty()
  @IsString()
  workStartTime!: string;

  @ApiProperty()
  @IsString()
  workEndTime!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  workingDays!: string[];
}

export class UpdateDoctorDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  qualifications?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  consultationFee?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  workStartTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  workEndTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  workingDays?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  preferences?: Record<string, any>;
}

export class DoctorSearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(DoctorSpecialization)
  specialization?: DoctorSpecialization;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hospitalId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  minRating?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxFee?: number;
}