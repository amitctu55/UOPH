import { IsEmail, IsString, MinLength, IsOptional, IsArray } from "class-validator";

export class LoginRequest {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class RegisterRequest {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class JwtPayload {
  @IsString()
  sub: string;

  @IsString()
  username: string;

  @IsArray()
  @IsOptional()
  roles?: string[];
}
