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
import { ApiProperty } from "@nestjs/swagger";

export class CreateHospitalDto {
  @ApiProperty({ description: "Hospital name" })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: "Registration number", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  registrationNumber?: string;

  @ApiProperty({ description: "Address" })
  @IsString()
  @MaxLength(500)
  address: string;

  @ApiProperty({ description: "City" })
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiProperty({ description: "State", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @ApiProperty({ description: "Postal code", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  postalCode?: string;

  @ApiProperty({ description: "Country", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiProperty({ description: "Latitude", required: false })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiProperty({ description: "Longitude", required: false })
  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @ApiProperty({ description: "Phone number", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ description: "Email address", required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: "Website URL", required: false })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ description: "Logo URL", required: false })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiProperty({ description: "Hospital bio/description", required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: "Verification status", required: false })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
