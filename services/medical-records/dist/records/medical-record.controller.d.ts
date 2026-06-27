import { StreamableFile } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { RecordType } from './entities/medical-record.entity';
import { Request } from 'express';
export declare class MedicalRecordController {
    private readonly medicalRecordService;
    constructor(medicalRecordService: MedicalRecordService);
    createRecord(createRecordDto: CreateMedicalRecordDto, request: Request): Promise<import("./entities/medical-record.entity").MedicalRecordEntity>;
    getPatientRecords(patientId: string, request: Request): Promise<import("./entities/medical-record.entity").MedicalRecordEntity[]>;
    getRecord(recordId: string, request: Request): Promise<import("./entities/medical-record.entity").MedicalRecordEntity>;
    downloadRecord(recordId: string, request: Request): Promise<StreamableFile>;
    shareRecord(recordId: string, accessLevel: string): Promise<import("./entities/medical-record.entity").MedicalRecordEntity>;
    deleteRecord(recordId: string, request: Request): Promise<{
        message: string;
    }>;
    getRecordsByType(patientId: string, recordType: RecordType): Promise<import("./entities/medical-record.entity").MedicalRecordEntity[]>;
    getAccessLog(recordId: string): Promise<any[]>;
}
