"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
        this.logger = new common_1.Logger(NotificationService_1.name);
    }
    async createNotification(createNotificationDto) {
        try {
            const notification = this.notificationRepository.create({
                ...createNotificationDto,
                status: notification_entity_1.NotificationStatus.PENDING,
            });
            const saved = await this.notificationRepository.save(notification);
            this.logger.log(`Notification created: ${saved.id}`);
            const sentNotification = await this.sendNotification(saved.id);
            return sentNotification;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.logger.error(`Error creating notification: ${message}`);
            throw error;
        }
    }
    async getNotification(id) {
        const notification = await this.notificationRepository.findOne({
            where: { id },
        });
        if (!notification) {
            throw new common_1.NotFoundException(`Notification with ID ${id} not found`);
        }
        return notification;
    }
    async getNotificationsForRecipient(recipientId, status) {
        const where = { recipientId };
        if (status) {
            where.status = status;
        }
        return this.notificationRepository.find({
            where,
            order: { createdAt: "DESC" },
        });
    }
    async updateNotification(id, updateNotificationDto) {
        const notification = await this.getNotification(id);
        Object.assign(notification, updateNotificationDto);
        return this.notificationRepository.save(notification);
    }
    async deleteNotification(id) {
        const result = await this.notificationRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Notification with ID ${id} not found`);
        }
    }
    async markAsRead(id) {
        const notification = await this.getNotification(id);
        notification.status = notification_entity_1.NotificationStatus.READ;
        notification.readAt = new Date();
        return this.notificationRepository.save(notification);
    }
    async sendNotification(notificationId) {
        const notification = await this.getNotification(notificationId);
        notification.status = notification_entity_1.NotificationStatus.SENT;
        notification.sentAt = new Date();
        const sentNotification = await this.notificationRepository.save(notification);
        this.logger.log(`Notification sent: ${notificationId}`);
        return sentNotification;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], NotificationService);
//# sourceMappingURL=notification.service.js.map