export declare enum ConsultationStatus {
    SCHEDULED = "scheduled",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    NO_SHOW = "no_show"
}
export declare enum ConsultationType {
    VIDEO = "video",
    AUDIO = "audio",
    CHAT = "chat"
}
export declare class ConsultationEntity {
    id: string;
    appointmentId: string;
    patientId: string;
    doctorId: string;
    type: ConsultationType;
    status: ConsultationStatus;
    scheduledAt: Date;
    startedAt: Date;
    endedAt: Date;
    durationMinutes: number;
    meetingUrl: string;
    recordingUrl: string;
    notes: string;
    prescription: string;
    vitals: Record<string, any>;
    fee: number;
    isRecorded: boolean;
    isPaid: boolean;
    createdAt: Date;
    updatedAt: Date;
}
