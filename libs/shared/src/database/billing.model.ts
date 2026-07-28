import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type InvoiceDocument = HydratedDocument<Invoice>;
export type PaymentDocument = HydratedDocument<Payment>;
export type WalletDocument = HydratedDocument<Wallet>;
export type WalletTransactionDocument = HydratedDocument<WalletTransaction>;

@Schema({
  timestamps: true,
  collection: 'bills'
})
export class Invoice {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  patientId!: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' })
  appointmentId?: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  billNumber!: string;

  @Prop({ type: Number, required: true })
  amountSubtotal!: number;

  @Prop({ type: Number, required: true })
  taxAmount!: number;

  @Prop({ type: Number, required: true })
  discountAmount!: number;

  @Prop({ type: Number, required: true })
  totalAmount!: number;

  @Prop({
    type: String,
    enum: ['unpaid', 'partially_paid', 'paid'],
    default: 'unpaid'
  })
  status!: string;

  @Prop({ type: Date })
  dueDate?: Date;

  @Prop({ type: Date })
  issueDate?: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

// Remove __v and any other fields we don't want in the output
InvoiceSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  }
});

InvoiceSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  }
});

@Schema({
  timestamps: true,
  collection: 'payments'
})
export class Payment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true })
  billId!: mongoose.Types.ObjectId;

  @Prop({ type: Number, required: true })
  amount!: number;

  @Prop({
    type: String,
    enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
    required: true
  })
  paymentMethod!: string;

  @Prop({ type: String, unique: true })
  transactionId?: string;

  @Prop({
    type: String,
    enum: ['stripe', 'razorpay', 'paypal'],
    required: true
  })
  paymentGateway!: string;

  @Prop({
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  })
  status!: string;

  @Prop({ type: Date })
  paidAt?: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  }
});

PaymentSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  }
});

@Schema({
  timestamps: true,
  collection: 'patient_wallets'
})
export class Wallet {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true })
  patientId!: mongoose.Types.ObjectId;

  @Prop({ type: Number, required: true, default: 0 })
  balance: number = 0;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

WalletSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  }
});

WalletSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  }
});

@Schema({
  timestamps: true,
  collection: 'wallet_transactions'
})
export class WalletTransaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true })
  walletId!: mongoose.Types.ObjectId;

  @Prop({
    type: String,
    enum: ['credit', 'debit'],
    required: true
  })
  transactionType!: string;

  @Prop({ type: Number, required: true })
  amount!: number;

  @Prop({ type: String, maxlength: 255 })
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
  relatedPaymentId?: mongoose.Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date;
}

export const WalletTransactionSchema = SchemaFactory.createForClass(WalletTransaction);

WalletTransactionSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  }
});

WalletTransactionSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  }
});