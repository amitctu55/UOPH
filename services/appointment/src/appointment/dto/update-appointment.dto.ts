import { IsDate, IsString, IsOptional, Matches } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAppointmentDto {
  @ApiProperty({ description: "New appointment date", required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  appointmentDate?: Date;

  @ApiProperty({ description: "New appointment time", required: false })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  @IsOptional()
  appointmentTime?: string;
}
