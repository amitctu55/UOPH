import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum ConsultationStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  NO_SHOW = "no_show",
}

export enum ConsultationType {
  VIDEO = "video",
  AUDIO = "audio",
  CHAT = "chat",
}

@Entity("consultations")
@Index(["patientId"])
@Index(["doctorId"])
@Index(["status"])
export class ConsultationEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  appointmentId: string;

  @Column({ type: "uuid" })
  patientId: string;

  @Column({ type: "uuid" })
  doctorId: string;

  @Column({ type: "enum", enum: ConsultationType })
  type: ConsultationType;

  @Column({ type: "enum", enum: ConsultationStatus, default: ConsultationStatus.SCHEDULED })
  status: ConsultationStatus;

  @Column({ type: "timestamp" })
  scheduledAt: Date;

  @Column({ type: "timestamp", nullable: true })
  startedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  endedAt: Date;

  @Column({ type: "int", nullable: true })
  durationMinutes: number;

  @Column({ type: "varchar", nullable: true })
  meetingUrl: string;

  @Column({ type: "varchar", nullable: true })
  recordingUrl: string;

  @Column({ type: "text", nullable: true })
  notes: string;

  @Column({ type: "text", nullable: true })
  prescription: string;

  @Column({ type: "jsonb", nullable: true })
  vitals: Record<string, any>;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  fee: number;

  @Column({ type: "boolean", default: false })
  isRecorded: boolean;

  @Column({ type: "boolean", default: false })
  isPaid: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
