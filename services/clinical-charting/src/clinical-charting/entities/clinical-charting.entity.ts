import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum ClinicalDataType {
  VITAL_SIGNS = "vital_signs",
  MEDICATION = "medication",
  ALLERGY = "allergy",
  IMMUNIZATION = "immunization",
  LAB_RESULT = "lab_result",
  CLINICAL_NOTE = "clinical_note",
  TREATMENT_PLAN = "treatment_plan",
}

@Entity("clinical_charting_data")
@Index(["patientId"])
@Index(["clinicalDataType"])
@Index(["createdAt"])
export class ClinicalChartingEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  patientId: string;

  @Column({ type: "uuid", nullable: true })
  encounterId: string; // Optional reference to a specific visit/encounter

  @Column({ type: "uuid", nullable: true })
  providerId: string; // ID of the healthcare provider who recorded this

  @Column({ type: "enum", enum: ClinicalDataType })
  clinicalDataType: ClinicalDataType;

  @Column({ type: "varchar" })
  title: string; // Brief title/summary

  @Column({ type: "text", nullable: true })
  description: string; // Detailed description or notes

  // Structured data stored as JSONB for flexibility
  @Column({ type: "jsonb", nullable: true })
  data: Record<string, any>;

  @Column({ type: "timestamp", nullable: true })
  recordedAt: Date; // When the data was measured/recorded

  @Column({ type: "boolean", default: false })
  isActive: boolean; // For tracking current vs historical data (e.g., discontinued medications)

  @Column({ type: "jsonb", default: [] })
  accessLog: Array<{
    userId: string;
    accessedAt: string;
    action: string;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;
}