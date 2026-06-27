import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum DoctorSpecialization {
  CARDIOLOGY = "cardiology",
  ORTHOPEDICS = "orthopedics",
  NEUROLOGY = "neurology",
  DERMATOLOGY = "dermatology",
  PEDIATRICS = "pediatrics",
  PSYCHIATRY = "psychiatry",
  GENERAL_PRACTICE = "general_practice",
  OPHTHALMOLOGY = "ophthalmology",
  ENT = "ent",
  GASTROENTEROLOGY = "gastroenterology",
}

export enum AvailabilityStatus {
  AVAILABLE = "available",
  BUSY = "busy",
  OFF = "off",
}

@Entity("doctors")
@Index(["userId"], { unique: true })
@Index(["specialization"])
@Index(["hospitalId"])
export class DoctorEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  userId: string;

  @Column({ type: "uuid" })
  hospitalId: string;

  @Column({ type: "varchar" })
  licenseNumber: string;

  @Column({ type: "varchar", unique: true })
  licenseNumber2: string;

  @Column({ type: "enum", enum: DoctorSpecialization })
  specialization: DoctorSpecialization;

  @Column({ type: "text", nullable: true })
  qualifications: string;

  @Column({ type: "text", nullable: true })
  experience: string;

  @Column({ type: "int", default: 0 })
  yearsOfExperience: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column({ type: "int", default: 0 })
  totalRatings: number;

  @Column({ type: "int", default: 0 })
  consultationCount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  consultationFee: number;

  @Column({ type: "enum", enum: AvailabilityStatus, default: AvailabilityStatus.AVAILABLE })
  availabilityStatus: AvailabilityStatus;

  @Column({ type: "time", nullable: true })
  workStartTime: string;

  @Column({ type: "time", nullable: true })
  workEndTime: string;

  @Column({ type: "simple-array", default: "MON,TUE,WED,THU,FRI" })
  workingDays: string[];

  @Column({ type: "jsonb", nullable: true })
  preferences: Record<string, any>;

  @Column({ type: "boolean", default: true })
  isVerified: boolean;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
