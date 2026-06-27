export declare enum RecordType {
    PRESCRIPTION = "prescription",
    LAB_REPORT = "lab_report",
    SCAN_IMAGE = "scan_image",
    DIAGNOSIS = "diagnosis",
    TREATMENT_PLAN = "treatment_plan",
    VACCINATION = "vaccination",
    ALLERGY = "allergy",
    OTHER = "other"
}
export declare enum AccessLevel {
    PRIVATE = "private",
    DOCTOR_ONLY = "doctor_only",
    HOSPITAL_STAFF = "hospital_staff",
    SHARED = "shared"
}
export declare class MedicalRecordEntity {
    id: string;
    patientId: string;
    doctorId: string;
    hospitalId: string;
    recordType: RecordType;
    title: string;
    description: string;
    fileUrl: string;
    fileName: string;
    mimeType: string;
    fileSizeBytes: number;
    recordDate: Date;
    accessLevel: AccessLevel;
    isEncrypted: boolean;
    metadata: Record<string, any>;
    accessLog: Array<{
        userId: string;
        accessedAt: string;
        ipAddress?: string;
        action: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
