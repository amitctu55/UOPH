import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "../../../user/src/user/user.service";
import { UserRole } from "../../../user/src/user/entities/user.entity";
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone?: string | undefined;
        profileImage?: string | undefined;
        role: UserRole;
        status: import("@user/user/entities/user.entity").UserStatus;
        isMfaEnabled: boolean;
        mfaSecret?: string | undefined;
        bio?: string | undefined;
        preferences?: Record<string, any> | undefined;
        metadata?: Record<string, any> | undefined;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt?: Date | undefined;
        deletedAt?: Date | undefined;
    }>;
}
