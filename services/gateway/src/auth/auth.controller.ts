import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequest, RegisterRequest } from "upchar-shared/dist/auth/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }

  @Post("register")
  async register(@Body() registerRequest: RegisterRequest) {
    return this.authService.register(registerRequest);
  }
}
