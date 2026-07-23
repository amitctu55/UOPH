import { Repository } from "typeorm";
import { PatientEntity } from "../entities/patient.entity";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { UpdatePatientDto } from "../dto/update-patient.dto";
export declare class PatientService {
    private patientRepository;
    private readonly logger;
    constructor(patientRepository: Repository<PatientEntity>);
    createPatient(dto: CreatePatientDto): Promise<PatientEntity>;
    getPatientById(id: string): Promise<PatientEntity>;
    getPatientByUserId(userId: string): Promise<PatientEntity>;
    updatePatient(id: string, dto: UpdatePatientDto): Promise<PatientEntity>;
    deactivatePatient(id: string): Promise<{
        message: string;
    }>;
}
