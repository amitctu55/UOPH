import { PatientService } from "../services/patient.service";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { UpdatePatientDto } from "../dto/update-patient.dto";
import { PatientEntity } from "../entities/patient.entity";
export declare class PatientController {
    private patientService;
    constructor(patientService: PatientService);
    createPatient(dto: CreatePatientDto, request: any): Promise<PatientEntity>;
    getPatientById(id: string): Promise<PatientEntity>;
    getPatientByUserId(userId: string): Promise<PatientEntity>;
    updatePatient(id: string, dto: UpdatePatientDto): Promise<PatientEntity>;
    deactivatePatient(id: string): Promise<{
        message: string;
    }>;
}
