import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("hospitals")
@Index(["city"])
@Index(["is_verified"])
export class HospitalEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: "varchar", length: 100, unique: true, nullable: true })
  registrationNumber?: string;

  @Column({ type: "varchar", length: 500, nullable: false })
  address: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  city: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  state?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  postalCode?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  country?: string;

  @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
  longitude?: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  email?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  website?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  websiteUrl?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  logoUrl?: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "timestamp", nullable: true })
  verifiedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
