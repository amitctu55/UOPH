import { Repository } from "typeorm";
import { UserEntity, UserRole } from "./entities/user.entity";
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from "./dto/user.dto";
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<UserEntity>);
    createUser(dto: CreateUserDto): Promise<Omit<UserEntity, "passwordHash">>;
    getUserProfile(userId: string): Promise<Omit<UserEntity, "passwordHash">>;
    updateUserProfile(userId: string, dto: UpdateUserDto): Promise<Omit<UserEntity, "passwordHash">>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    getUserByEmail(email: string): Promise<Omit<UserEntity, "passwordHash">>;
    getUserByEmailWithPassword(email: string): Promise<UserEntity | null>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    getUsersByRole(role: UserRole): Promise<Omit<UserEntity, "passwordHash">[]>;
    updateLastLogin(userId: string): Promise<void>;
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
