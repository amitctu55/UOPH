import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../user/src/user/entities/user.entity";

export enum BloodType {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  PREFER_NOT_TO_SAY = "prefer_not_to_say",
}

@Entity("patients")
@Index(["userId"])
@Index(["medicalRecordNumber"])
export class PatientEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ type: "date" })
  dateOfBirth!: Date;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender!: Gender;

  @Column({ type: "varchar", length: 20, nullable: true, unique: true })
  medicalRecordNumber?: string;

  @Column({ type: "enum", enum: BloodType, nullable: true })
  bloodType?: BloodType;

  @Column({ type: "varchar", length: 100, nullable: true })
  phoneNumber?: string;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  city?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  state?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  postalCode?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  country?: string;

  @Column({ type: "text", nullable: true })
  emergencyContactName?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  emergencyContactPhone?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  primaryCarePhysician?: string;

  @Column({ type: "text", nullable: true })
  insuranceInformation?: string;

  @Column({ type: "text", nullable: true })
  allergies?: string;

  @Column({ type: "text", nullable: true })
  chronicConditions?: string;

  @Column({ type: "boolean", default: false })
  isDeceased!: boolean;

  @Column({ type: "timestamp", nullable: true })
  deceasedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}