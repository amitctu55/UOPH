import { UserEntity } from "../../../user/src/user/entities/user.entity";
export declare enum BloodType {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-"
}
export declare enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
    PREFER_NOT_TO_SAY = "prefer_not_to_say"
}
export declare class PatientEntity {
    id: string;
    userId: string;
    user: UserEntity;
    dateOfBirth: Date;
    gender: Gender;
    medicalRecordNumber?: string;
    bloodType?: BloodType;
    phoneNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    primaryCarePhysician?: string;
    insuranceInformation?: string;
    allergies?: string;
    chronicConditions?: string;
    isDeceased: boolean;
    deceasedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
