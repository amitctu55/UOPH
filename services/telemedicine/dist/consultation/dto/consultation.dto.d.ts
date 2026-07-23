import { ConsultationType } from "../entities/consultation.entity";
export declare class CreateConsultationDto {
    appointmentId: string;
    patientId: string;
    doctorId: string;
    type: ConsultationType;
    scheduledAt: Date;
    fee: number;
}
export declare class UpdateConsultationDto {
    notes?: string;
    prescription?: string;
    vitals?: Record<string, any>;
}
export declare class StartConsultationDto {
    meetingUrl: string;
    recordSession?: boolean;
}
export declare class EndConsultationDto {
    notes: string;
    recordingUrl?: string;
    vitals?: Record<string, any>;
}
