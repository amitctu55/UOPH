import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum NotificationType {
  APPOINTMENT_REMINDER = "appointment_reminder",
  APPOINTMENT_CONFIRMED = "appointment_confirmed",
  APPOINTMENT_CANCELLED = "appointment_cancelled",
  PRESCRIPTION_READY = "prescription_ready",
  LAB_RESULTS_READY = "lab_results_ready",
  BILLING_REMINDER = "billing_reminder",
  WELCOME = "welcome",
  PROMOTIONAL = "promotional",
  SYSTEM_ALERT = "system_alert",
}

export enum NotificationStatus {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
  READ = "read",
  ARCHIVED = "archived",
}

export enum NotificationChannel {
  EMAIL = "email",
  SMS = "sms",
  PUSH = "push",
  IN_APP = "in_app",
}

@Entity("notifications")
@Index(["recipientId"])
@Index(["status"])
@Index(["type"])
@Index(["createdAt"])
export class NotificationEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  recipientId: string;

  @Column({ type: "uuid", nullable: true })
  senderId: string;

  @Column({ type: "enum", enum: NotificationType })
  type: NotificationType;

  @Column({ type: "enum", enum: NotificationChannel })
  channel: NotificationChannel;

  @Column({ type: "enum", enum: NotificationStatus, default: NotificationStatus.PENDING })
  status: NotificationStatus;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "jsonb", nullable: true })
  data: Record<string, any>;

  @Column({ type: "timestamp", nullable: true })
  scheduledAt: Date;

  @Column({ type: "timestamp", nullable: true })
  sentAt: Date;

  @Column({ type: "timestamp", nullable: true })
  readAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
