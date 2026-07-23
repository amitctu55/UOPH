import { UserRole } from "../entities/user.entity";
export declare class CreateUserDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phone?: string;
    role: UserRole;
}
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    profileImage?: string;
    preferences?: Record<string, any>;
    metadata?: Record<string, any>;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
