import {
  IsUUID,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsLongitude,
  IsLatitude,
  IsPhoneNumber,
  IsEmail,
  IsUrl,
} from "class-validator";
import { PartialType } from "@nestjs/swagger";
import { CreateHospitalDto } from "./create-hospital.dto";

export class UpdateHospitalDto extends PartialType(CreateHospitalDto) {}
