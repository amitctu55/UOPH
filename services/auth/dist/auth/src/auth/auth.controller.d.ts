import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
        role: import("@user/user/entities/user.entity").UserRole;
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
