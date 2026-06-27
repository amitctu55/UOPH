import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginRequest, RegisterRequest, JwtPayload } from "upchar-shared";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginRequest: LoginRequest) {
    if (loginRequest.username !== "demo" || loginRequest.password !== "password") {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = {
      sub: "demo-user-id",
      username: loginRequest.username,
      roles: ["patient"],
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
      }),
    };
  }

  async register(registerRequest: RegisterRequest) {
    return {
      id: "demo-user-id",
      email: registerRequest.email,
      username: registerRequest.username,
    };
  }
}
