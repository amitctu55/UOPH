import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("user_analytics")
export class UserAnalyticsEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("date")
  date!: string; // YYYY-MM-DD

  @Column("int", { default: 0 })
  totalUsers!: number;

  @Column("int", { default: 0 })
  newPatients!: number;

  @Column("int", { default: 0 })
  newDoctors!: number;

  @Column("int", { default: 0 })
  activeUsers!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
