import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum RecordType {
  PRESCRIPTION = "prescription",
  LAB_REPORT = "lab_report",
  SCAN_IMAGE = "scan_image",
  DIAGNOSIS = "diagnosis",
  TREATMENT_PLAN = "treatment_plan",
  VACCINATION = "vaccination",
  ALLERGY = "allergy",
  OTHER = "other",
}

export enum AccessLevel {
  PRIVATE = "private",
  DOCTOR_ONLY = "doctor_only",
  HOSPITAL_STAFF = "hospital_staff",
  SHARED = "shared",
}

@Entity("medical_records")
@Index(["patientId"])
@Index(["doctorId"])
@Index(["recordType"])
export class MedicalRecordEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  patientId: string;

  @Column({ type: "uuid", nullable: true })
  doctorId: string;

  @Column({ type: "uuid", nullable: true })
  hospitalId: string;

  @Column({ type: "enum", enum: RecordType })
  recordType: RecordType;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar" })
  fileUrl: string;

  @Column({ type: "varchar" })
  fileName: string;

  @Column({ type: "varchar", nullable: true })
  mimeType: string;

  @Column({ type: "int", nullable: true })
  fileSizeBytes: number;

  @Column({ type: "timestamp", nullable: true })
  recordDate: Date;

  @Column({ type: "enum", enum: AccessLevel, default: AccessLevel.DOCTOR_ONLY })
  accessLevel: AccessLevel;

  @Column({ type: "boolean", default: false })
  isEncrypted: boolean;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  @Column({ type: "jsonb", default: "[]" })
  accessLog: Array<{
    userId: string;
    accessedAt: string;
    ipAddress?: string;
    action: string;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;
}
