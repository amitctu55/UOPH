import { Repository } from "typeorm";
import { ConsultationEntity } from "./entities/consultation.entity";
import { CreateConsultationDto, UpdateConsultationDto, StartConsultationDto, EndConsultationDto } from "./dto/consultation.dto";
export declare class ConsultationService {
    private readonly consultationRepository;
    private readonly logger;
    constructor(consultationRepository: Repository<ConsultationEntity>);
    createConsultation(dto: CreateConsultationDto): Promise<ConsultationEntity>;
    getConsultation(consultationId: string): Promise<ConsultationEntity>;
    getPatientConsultations(patientId: string): Promise<ConsultationEntity[]>;
    getDoctorConsultations(doctorId: string): Promise<ConsultationEntity[]>;
    startConsultation(consultationId: string, dto: StartConsultationDto): Promise<ConsultationEntity>;
    endConsultation(consultationId: string, dto: EndConsultationDto): Promise<ConsultationEntity>;
    updateConsultation(consultationId: string, dto: UpdateConsultationDto): Promise<ConsultationEntity>;
    cancelConsultation(consultationId: string): Promise<{
        message: string;
    }>;
    getUpcomingConsultations(doctorId: string, days?: number): Promise<ConsultationEntity[]>;
    markNoShow(consultationId: string): Promise<{
        message: string;
    }>;
}
