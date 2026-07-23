import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from "./dto/user.dto";
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    registerUser(dto: CreateUserDto): Promise<Omit<import("./entities/user.entity").UserEntity, "passwordHash">>;
    getUserProfile(userId: string): Promise<Omit<import("./entities/user.entity").UserEntity, "passwordHash">>;
    updateUserProfile(userId: string, dto: UpdateUserDto): Promise<Omit<import("./entities/user.entity").UserEntity, "passwordHash">>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    enableMfa(userId: string, mfaSecret: string): Promise<{
        message: string;
    }>;
    disableMfa(userId: string): Promise<{
        message: string;
    }>;
    suspendUser(userId: string, reason: string): Promise<{
        message: string;
    }>;
    unsuspendUser(userId: string): Promise<{
        message: string;
    }>;
    deleteUser(userId: string): Promise<{
        message: string;
    }>;
}
