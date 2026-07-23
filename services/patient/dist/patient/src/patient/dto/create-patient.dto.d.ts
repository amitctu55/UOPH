import { BloodType } from "../entities/patient.entity";
import { Gender } from "../entities/patient.entity";
export declare class CreatePatientDto {
    userId: string;
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
}
