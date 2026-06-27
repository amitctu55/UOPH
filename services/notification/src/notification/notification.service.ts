import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationEntity, NotificationStatus } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>
  ) {}

  async createNotification(
    createNotificationDto: CreateNotificationDto
  ): Promise<NotificationEntity> {
    try {
      const notification = this.notificationRepository.create({
        ...createNotificationDto,
        status: NotificationStatus.PENDING,
      });

      const saved = await this.notificationRepository.save(notification);
      this.logger.log(`Notification created: ${saved.id}`);

      // In a real implementation, you would send the notification here
      // For now, we'll just mark it as sent immediately
      const sentNotification = await this.sendNotification(saved.id);

      return sentNotification;
    } catch (error) {
      this.logger.error(`Error creating notification: ${error.message}`);
      throw error;
    }
  }

  async getNotification(id: string): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  async getNotificationsForRecipient(
    recipientId: string,
    status?: NotificationStatus
  ): Promise<NotificationEntity[]> {
    const where: any = { recipientId };
    if (status) {
      where.status = status;
    }

    return this.notificationRepository.find({
      where,
      order: { createdAt: "DESC" },
    });
  }

  async updateNotification(
    id: string,
    updateNotificationDto: UpdateNotificationDto
  ): Promise<NotificationEntity> {
    const notification = await this.getNotification(id);
    Object.assign(notification, updateNotificationDto);
    return this.notificationRepository.save(notification);
  }

  async deleteNotification(id: string): Promise<void> {
    const result = await this.notificationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
  }

  async markAsRead(id: string): Promise<NotificationEntity> {
    const notification = await this.getNotification(id);
    notification.status = NotificationStatus.READ;
    notification.readAt = new Date();
    return this.notificationRepository.save(notification);
  }

  private async sendNotification(notificationId: string): Promise<NotificationEntity> {
    const notification = await this.getNotification(notificationId);

    // Simulate sending notification
    // In a real implementation, you would integrate with email/SMS/push providers here

    notification.status = NotificationStatus.SENT;
    notification.sentAt = new Date();

    const sentNotification = await this.notificationRepository.save(notification);
    this.logger.log(`Notification sent: ${notificationId}`);

    return sentNotification;
  }
}
