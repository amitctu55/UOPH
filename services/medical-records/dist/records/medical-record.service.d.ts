import { Repository } from "typeorm";
import { MedicalRecordEntity, RecordType, AccessLevel } from "./entities/medical-record.entity";
export declare class MedicalRecordService {
    private readonly recordRepository;
    private readonly logger;
    constructor(recordRepository: Repository<MedicalRecordEntity>);
    uploadRecord(patientId: string, doctorId: string, recordType: RecordType, title: string, fileUrl: string, fileName: string): Promise<MedicalRecordEntity>;
    getPatientRecords(patientId: string, requestingUserId: string): Promise<MedicalRecordEntity[]>;
    getRecord(recordId: string, requestingUserId: string): Promise<MedicalRecordEntity>;
    downloadRecord(recordId: string, requestingUserId: string): Promise<{
        fileUrl: string;
        fileName: string;
    }>;
    shareRecord(recordId: string, accessLevel: AccessLevel): Promise<MedicalRecordEntity>;
    deleteRecord(recordId: string, requestingUserId: string): Promise<{
        message: string;
    }>;
    getRecordsByType(patientId: string, recordType: RecordType): Promise<MedicalRecordEntity[]>;
    getAccessLog(recordId: string): Promise<any[]>;
    private logAccess;
}
