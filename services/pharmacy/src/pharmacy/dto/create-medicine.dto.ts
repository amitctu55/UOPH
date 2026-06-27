import { IsOptional, IsString, IsBoolean, IsInt, Min, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicineDto {
  @ApiProperty({ description: "Medicine name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Generic name", required: false })
  @IsOptional()
  @IsString()
  genericName?: string;

  @ApiProperty({ description: "Strength (e.g., 500mg)", required: false })
  @IsOptional()
  @IsString()
  strength?: string;

  @ApiProperty({ description: "Form (tablet, capsule, syrup, injection)", required: false })
  @IsOptional()
  @IsString()
  form?: string;

  @ApiProperty({ description: "Manufacturer", required: false })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiProperty({ description: "HSN code", required: false })
  @IsOptional()
  @IsString()
  hsCode?: string;

  @ApiProperty({ description: "Price per unit", required: false })
  @IsOptional()
  @IsPositive()
  price?: number;

  @ApiProperty({ description: "Whether prescription is required", required: false })
  @IsOptional()
  @IsBoolean()
  requiresPrescription?: boolean = false;

  @ApiProperty({ description: "Stock quantity", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  stockQuantity?: number = 0;

  @ApiProperty({ description: "Reorder level", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  reorderLevel?: number = 50;
}
