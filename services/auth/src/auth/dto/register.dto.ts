import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "patient@upchar.health" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "Alex", description: "Display / first name source" })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  username!: string;

  @ApiProperty({ example: "SecurePass123!", minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}
