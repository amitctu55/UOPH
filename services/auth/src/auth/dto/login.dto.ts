import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "Email address used as username",
    example: "patient@upchar.health",
  })
  @IsString()
  @IsEmail()
  username!: string;

  @ApiProperty({ example: "SecurePass123!", minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}
