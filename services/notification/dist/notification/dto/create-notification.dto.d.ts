import { NotificationType, NotificationChannel } from "../entities/notification.entity";
export declare class CreateNotificationDto {
    recipientId: string;
    senderId?: string;
    type: NotificationType;
    channel: NotificationChannel;
    title: string;
    content: string;
    relatedEntityId?: string;
    scheduledAt?: Date;
}
export declare class UpdateNotificationDto {
    title?: string;
    content?: string;
    status?: NotificationStatus;
}
