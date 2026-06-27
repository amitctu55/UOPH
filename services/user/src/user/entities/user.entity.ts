import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum UserRole {
  PATIENT = "patient",
  DOCTOR = "doctor",
  HOSPITAL_ADMIN = "hospital_admin",
  SYSTEM_ADMIN = "system_admin",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

@Entity("users")
@Index(["email"], { unique: true })
@Index(["status"])
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @Column({ type: "text", nullable: true })
  profileImage: string;

  @Column({ type: "varchar" })
  passwordHash: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: "boolean", default: false })
  isMfaEnabled: boolean;

  @Column({ type: "varchar", nullable: true })
  mfaSecret: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "jsonb", nullable: true })
  preferences: Record<string, any>;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  lastLoginAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;
}
