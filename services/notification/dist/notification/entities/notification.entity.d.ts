export declare enum NotificationType {
    APPOINTMENT_REMINDER = "appointment_reminder",
    APPOINTMENT_CONFIRMED = "appointment_confirmed",
    APPOINTMENT_CANCELLED = "appointment_cancelled",
    PRESCRIPTION_READY = "prescription_ready",
    LAB_RESULTS_READY = "lab_results_ready",
    BILLING_REMINDER = "billing_reminder",
    WELCOME = "welcome",
    PROMOTIONAL = "promotional",
    SYSTEM_ALERT = "system_alert"
}
export declare enum NotificationStatus {
    PENDING = "pending",
    SENT = "sent",
    FAILED = "failed",
    READ = "read",
    ARCHIVED = "archived"
}
export declare enum NotificationChannel {
    EMAIL = "email",
    SMS = "sms",
    PUSH = "push",
    IN_APP = "in_app"
}
export declare class NotificationEntity {
    id: string;
    recipientId: string;
    senderId: string;
    type: NotificationType;
    channel: NotificationChannel;
    status: NotificationStatus;
    title: string;
    content: string;
    data: Record<string, any>;
    scheduledAt: Date;
    sentAt: Date;
    readAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
