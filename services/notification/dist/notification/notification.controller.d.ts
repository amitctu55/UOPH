import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationEntity } from './entities/notification.entity';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    createNotification(createNotificationDto: CreateNotificationDto): Promise<NotificationEntity>;
    getNotifications(recipientId: string, status?: string): Promise<NotificationEntity[]>;
    getNotification(id: string): Promise<NotificationEntity>;
    : any;
}
