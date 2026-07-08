import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("medicines")
export class MedicineEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  genericName?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  strength?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  form?: string; // tablet, capsule, syrup, injection

  @Column({ type: "varchar", length: 255, nullable: true })
  manufacturer?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  hsnCode?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ type: "boolean", default: false })
  requiresPrescription!: boolean;

  @Column("int", { default: 0 })
  stockQuantity!: number;

  @Column("int", { default: 50 })
  reorderLevel!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
