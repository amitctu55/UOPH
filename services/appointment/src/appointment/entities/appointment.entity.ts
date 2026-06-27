import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { AppointmentStatusEnum } from "../enums/appointment-status.enum";
import { AppointmentTypeEnum } from "../enums/appointment-type.enum";

@Entity("appointments")
@Index(["patientId", "appointmentDate"])
@Index(["doctorId", "appointmentDate"])
@Index(["status"])
export class AppointmentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  patientId: string;

  @Column("uuid")
  doctorId: string;

  @Column("uuid", { nullable: true })
  hospitalId?: string;

  @Column("date")
  appointmentDate: Date;

  @Column("time")
  appointmentTime: string;

  @Column("int", { default: 30 })
  durationMinutes: number;

  @Column({
    type: "enum",
    enum: AppointmentTypeEnum,
  })
  appointmentType: AppointmentTypeEnum;

  @Column({
    type: "enum",
    enum: AppointmentStatusEnum,
    default: AppointmentStatusEnum.SCHEDULED,
  })
  status: AppointmentStatusEnum;

  @Column("text")
  reasonForVisit: string;

  @Column("text", { nullable: true })
  notes?: string;

  @Column("timestamp", { nullable: true })
  cancelledAt?: Date;

  @Column("uuid", { nullable: true })
  cancelledBy?: string;

  @Column("text", { nullable: true })
  cancellationReason?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
