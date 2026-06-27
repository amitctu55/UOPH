import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "../../user/user.service";
import * as bcrypt from "bcrypt";
import { UserRole } from "../../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(loginDto: LoginDto) {
    // Find user by email (username field is email)
    const user = await this.userService.getUserByEmail(loginDto.username);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Validate password
    const passwordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, username: user.email, roles: [user.role] };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
      }),
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existing = await this.userService.getUserByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException("User with this email already exists");
    }

    // Derive first and last name from username (email local part or provided username)
    const username = registerDto.username.trim();
    let firstName = username.length >= 2 ? username : "User";
    let lastName = "User";
    // Ensure min length 2
    if (firstName.length < 2) firstName = "User";
    if (lastName.length < 2) lastName = "User";

    const createUserDto = {
      email: registerDto.email.toLowerCase(),
      firstName,
      lastName,
      password: registerDto.password,
      phone: undefined,
      role: UserRole.PATIENT, // default role
    };

    const user = await this.userService.createUser(createUserDto);
    const { passwordHash: _, ...userWithoutPassword } = user;
    const payload = { sub: user.id, username: user.email, roles: [user.role] };
    return {
      ...userWithoutPassword,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
      }),
    };
  }
}
