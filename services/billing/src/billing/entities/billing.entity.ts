import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum InvoiceStatus {
  DRAFT = "draft",
  ISSUED = "issued",
  PENDING = "pending",
  PAID = "paid",
  OVERDUE = "overdue",
  CANCELLED = "cancelled",
}

export enum PaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  UPI = "upi",
  NET_BANKING = "net_banking",
  WALLET = "wallet",
  BANK_TRANSFER = "bank_transfer",
}

@Entity("invoices")
@Index(["patientId"])
@Index(["doctorId"])
@Index(["status"])
export class InvoiceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  patientId: string;

  @Column({ type: "uuid" })
  doctorId: string;

  @Column({ type: "uuid", nullable: true })
  appointmentId: string;

  @Column({ type: "varchar", unique: true })
  invoiceNumber: string;

  @Column({ type: "enum", enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
  status: InvoiceStatus;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "timestamp", nullable: true })
  issueDate: Date;

  @Column({ type: "timestamp", nullable: true })
  dueDate: Date;

  @Column({ type: "timestamp", nullable: true })
  paidDate: Date;

  @Column({ type: "jsonb", default: "[]" })
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity("payments")
@Index(["invoiceId"])
@Index(["status"])
export class PaymentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  invoiceId: string;

  @Column({ type: "uuid" })
  patientId: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "enum", enum: PaymentMethod })
  method: PaymentMethod;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({ type: "varchar", nullable: true })
  transactionId: string;

  @Column({ type: "varchar", nullable: true })
  reference: string;

  @Column({ type: "timestamp", nullable: true })
  processedAt: Date;

  @Column({ type: "text", nullable: true })
  failureReason: string;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity("wallets")
@Index(["userId"], { unique: true })
export class WalletEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", unique: true })
  userId: string;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  balance: number;

  @Column({ type: "int", default: 0 })
  transactionCount: number;

  @Column({ type: "timestamp", nullable: true })
  lastTransactionAt: Date;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
