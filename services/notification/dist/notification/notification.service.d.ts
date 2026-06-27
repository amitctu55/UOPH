import { Repository } from "typeorm";
import { NotificationEntity, NotificationStatus } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
export declare class NotificationService {
    private readonly notificationRepository;
    private readonly logger;
    constructor(notificationRepository: Repository<NotificationEntity>);
    createNotification(createNotificationDto: CreateNotificationDto): Promise<NotificationEntity>;
    getNotification(id: string): Promise<NotificationEntity>;
    getNotificationsForRecipient(recipientId: string, status?: NotificationStatus): Promise<NotificationEntity[]>;
    updateNotification(id: string, updateNotificationDto: UpdateNotificationDto): Promise<NotificationEntity>;
    deleteNotification(id: string): Promise<void>;
    markAsRead(id: string): Promise<NotificationEntity>;
    private sendNotification;
}
