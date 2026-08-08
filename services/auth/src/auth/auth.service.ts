import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "../users/user.service";
import { PublicUser, UserRole } from "../users/user.schema";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

type AuthResult = AuthTokens & {
  user: PublicUser;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  private signTokens(user: PublicUser): AuthTokens {
    const payload = {
      sub: user.id,
      username: user.email,
      roles: [user.role],
    };

    const refreshSeconds =
      Number(this.configService.get<string>("JWT_REFRESH_EXPIRATION")) || 60 * 60 * 24 * 7;

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: refreshSeconds }),
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResult> {
    const user = await this.userService.getUserByEmailWithPassword(loginDto.username);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    await this.userService.assertActive(user);

    const passwordValid = await this.userService.validatePassword(
      loginDto.password,
      user.passwordHash,
    );
    if (!passwordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    await this.userService.touchLastLogin(String(user._id));
    const publicUser = await this.userService.getUserById(String(user._id));
    return { user: publicUser, ...this.signTokens(publicUser) };
  }

  async register(registerDto: RegisterDto): Promise<AuthResult> {
    const existing = await this.userService.getUserByEmailWithPassword(registerDto.email);
    if (existing) {
      throw new ConflictException("User with this email already exists");
    }

    const username = registerDto.username.trim();
    const firstName = username.length >= 2 ? username.slice(0, 50) : "User";
    const lastName = "User";

    const publicUser = await this.userService.createUser({
      email: registerDto.email,
      firstName,
      lastName,
      password: registerDto.password,
      role: UserRole.PATIENT,
    });

    return { user: publicUser, ...this.signTokens(publicUser) };
  }
}
