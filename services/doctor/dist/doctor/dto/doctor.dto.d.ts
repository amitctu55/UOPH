import { DoctorSpecialization } from "../entities/doctor.entity";
export declare class CreateDoctorDto {
    userId: string;
    hospitalId: string;
    licenseNumber: string;
    specialization: DoctorSpecialization;
    qualifications?: string;
    experience?: string;
    yearsOfExperience: number;
    consultationFee: number;
    workStartTime: string;
    workEndTime: string;
    workingDays: string[];
}
export declare class UpdateDoctorDto {
    qualifications?: string;
    experience?: string;
    yearsOfExperience?: number;
    consultationFee?: number;
    workStartTime?: string;
    workEndTime?: string;
    workingDays?: string[];
    preferences?: Record<string, any>;
}
export declare class DoctorSearchDto {
    specialization?: DoctorSpecialization;
    hospitalId?: string;
    minRating?: number;
    maxFee?: number;
}
