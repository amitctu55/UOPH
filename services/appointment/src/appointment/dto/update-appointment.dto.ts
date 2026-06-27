import { IsDate, IsTimeString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAppointmentDto {
  @ApiProperty({ description: "New appointment date", required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  appointmentDate?: Date;

  @ApiProperty({ description: "New appointment time", required: false })
  @IsTimeString()
  @IsOptional()
  appointmentTime?: string;
}
