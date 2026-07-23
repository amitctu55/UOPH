export declare enum UserRole {
    PATIENT = "patient",
    DOCTOR = "doctor",
    HOSPITAL_ADMIN = "hospital_admin",
    SYSTEM_ADMIN = "system_admin"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare class UserEntity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    profileImage?: string;
    passwordHash: string;
    role: UserRole;
    status: UserStatus;
    isMfaEnabled: boolean;
    mfaSecret?: string;
    bio?: string;
    preferences?: Record<string, any>;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
    deletedAt?: Date;
}
