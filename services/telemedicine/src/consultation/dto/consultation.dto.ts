import { IsUUID, IsString, IsEnum, IsOptional, IsNumber, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ConsultationType } from "../entities/consultation.entity";
import { Type } from "class-transformer";

export class CreateConsultationDto {
  @ApiProperty()
  @IsUUID()
  appointmentId: string;

  @ApiProperty()
  @IsUUID()
  patientId: string;

  @ApiProperty()
  @IsUUID()
  doctorId: string;

  @ApiProperty({ enum: ConsultationType })
  @IsEnum(ConsultationType)
  type: ConsultationType;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  scheduledAt: Date;

  @ApiProperty()
  @IsNumber()
  fee: number;
}

export class UpdateConsultationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  prescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  vitals?: Record<string, any>;
}

export class StartConsultationDto {
  @ApiProperty()
  @IsString()
  meetingUrl: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  recordSession?: boolean;
}

export class EndConsultationDto {
  @ApiProperty()
  @IsString()
  notes: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  recordingUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  vitals?: Record<string, any>;
}
