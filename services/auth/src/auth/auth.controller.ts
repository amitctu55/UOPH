import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService, AuthResult } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtGuard } from "./jwt.guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<AuthResult> {
    return this.authService.login(loginDto);
  }

  @Post("register")
  async register(@Body() registerDto: RegisterDto): Promise<AuthResult> {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtGuard)
  @Get("me")
  async me(@Req() req: { user: { userId: string; username: string; roles: string[] } }) {
    return {
      userId: req.user.userId,
      username: req.user.username,
      roles: req.user.roles,
    };
  }
}
