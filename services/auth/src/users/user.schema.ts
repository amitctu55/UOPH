import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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

export type UserDocument = HydratedDocument<User>;

export interface PublicUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  isMfaEnabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
}

@Schema({ timestamps: true, collection: "users" })
export class User {
  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ type: String, required: true, select: false })
  passwordHash!: string;

  @Prop({ type: String, required: true, trim: true })
  firstName!: string;

  @Prop({ type: String, required: true, trim: true })
  lastName!: string;

  @Prop({ type: String, trim: true })
  phone?: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.PATIENT })
  role!: UserRole;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Prop({ type: Boolean, default: false })
  isMfaEnabled!: boolean;

  @Prop({ type: Date })
  lastLoginAt?: Date;

  @Prop({ type: Date })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set("toJSON", {
  virtuals: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_doc: unknown, ret: any) => {
    const id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    ret.id = id;
    return ret;
  },
});
