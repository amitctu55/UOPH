import {
  IsUUID,
  IsDate,
  IsTimeString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { AppointmentTypeEnum } from "../enums/appointment-type.enum";

export class CreateAppointmentDto {
  @ApiProperty({ description: "Patient ID" })
  @IsUUID()
  patientId: string;

  @ApiProperty({ description: "Doctor ID" })
  @IsUUID()
  doctorId: string;

  @ApiProperty({ description: "Hospital ID (optional)", required: false })
  @IsUUID()
  @IsOptional()
  hospitalId?: string;

  @ApiProperty({ description: "Appointment date (YYYY-MM-DD)" })
  @IsDate()
  @Type(() => Date)
  appointmentDate: Date;

  @ApiProperty({ description: "Appointment time (HH:mm)" })
  @IsTimeString()
  appointmentTime: string;

  @ApiProperty({ description: "Duration in minutes", default: 30 })
  @IsOptional()
  durationMinutes?: number = 30;

  @ApiProperty({ description: "Type of appointment" })
  @IsEnum(AppointmentTypeEnum)
  appointmentType: AppointmentTypeEnum;

  @ApiProperty({ description: "Reason for visit" })
  @IsString()
  @MaxLength(500)
  reasonForVisit: string;

  @ApiProperty({ description: "Additional notes", required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;
}
