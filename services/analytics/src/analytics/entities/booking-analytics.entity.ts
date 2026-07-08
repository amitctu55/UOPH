import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("booking_analytics")
export class BookingAnalyticsEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("date")
  date!: string; // YYYY-MM-DD

  @Column("int", { default: 0 })
  totalBookings!: number;

  @Column("int", { default: 0 })
  completedBookings!: number;

  @Column("int", { default: 0 })
  cancelledBookings!: number;

  @Column("int", { default: 0 })
  noShowBookings!: number;

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  revenueGenerated!: number;

  @Column("int", { default: 0 })
  uniquePatients!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
