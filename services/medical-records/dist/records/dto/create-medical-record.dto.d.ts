import { RecordType } from "../entities/medical-record.entity";
export declare class CreateMedicalRecordDto {
    patientId: string;
    doctorId: string;
    recordType: RecordType;
    title: string;
    description?: string;
    fileUrl: string;
    fileName: string;
    mimeType?: string;
    fileSizeBytes?: number;
    recordDate?: Date;
}
