import { ConsultationService } from "./consultation.service";
import { CreateConsultationDto, UpdateConsultationDto, StartConsultationDto, EndConsultationDto } from "./dto/consultation.dto";
export declare class ConsultationController {
    private readonly consultationService;
    private readonly logger;
    constructor(consultationService: ConsultationService);
    createConsultation(dto: CreateConsultationDto): Promise<import("./entities/consultation.entity").ConsultationEntity>;
    getConsultation(consultationId: string): Promise<import("./entities/consultation.entity").ConsultationEntity>;
    getPatientConsultations(patientId: string): Promise<import("./entities/consultation.entity").ConsultationEntity[]>;
    getDoctorConsultations(doctorId: string): Promise<import("./entities/consultation.entity").ConsultationEntity[]>;
    startConsultation(consultationId: string, dto: StartConsultationDto): Promise<import("./entities/consultation.entity").ConsultationEntity>;
    endConsultation(consultationId: string, dto: EndConsultationDto): Promise<import("./entities/consultation.entity").ConsultationEntity>;
    updateConsultation(consultationId: string, dto: UpdateConsultationDto): Promise<import("./entities/consultation.entity").ConsultationEntity>;
    cancelConsultation(consultationId: string): Promise<{
        message: string;
    }>;
}
