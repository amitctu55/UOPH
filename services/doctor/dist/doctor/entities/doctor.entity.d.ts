export declare enum DoctorSpecialization {
    CARDIOLOGY = "cardiology",
    ORTHOPEDICS = "orthopedics",
    NEUROLOGY = "neurology",
    DERMATOLOGY = "dermatology",
    PEDIATRICS = "pediatrics",
    PSYCHIATRY = "psychiatry",
    GENERAL_PRACTICE = "general_practice",
    OPHTHALMOLOGY = "ophthalmology",
    ENT = "ent",
    GASTROENTEROLOGY = "gastroenterology"
}
export declare enum AvailabilityStatus {
    AVAILABLE = "available",
    BUSY = "busy",
    OFF = "off"
}
export declare class DoctorEntity {
    id: string;
    userId: string;
    hospitalId: string;
    licenseNumber: string;
    licenseNumber2: string;
    specialization: DoctorSpecialization;
    qualifications: string;
    experience: string;
    yearsOfExperience: number;
    averageRating: number;
    totalRatings: number;
    consultationCount: number;
    consultationFee: number;
    availabilityStatus: AvailabilityStatus;
    workStartTime: string;
    workEndTime: string;
    workingDays: string[];
    preferences: Record<string, any>;
    isVerified: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
