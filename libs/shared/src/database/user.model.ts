import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  HOSPITAL_ADMIN = 'hospital_admin',
  SYSTEM_ADMIN = 'system_admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ type: String, required: true })
  passwordHash!: string;

  @Prop({ type: String, required: true, trim: true })
  firstName!: string;

  @Prop({ type: String, required: true, trim: true })
  lastName!: string;

  @Prop({ type: String, trim: true })
  phone?: string;

  @Prop({ type: String, trim: true })
  profileImage?: string;

  @Prop({ type: String, trim: true })
  bio?: string;

  @Prop({ type: Object, default: {} })
  preferences: Record<string, any> = {};

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any> = {};

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.PATIENT
  })
  role!: UserRole;

  @Prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  status!: UserStatus;

  @Prop({ type: Boolean, default: false })
  isMfaEnabled: boolean = false;

  @Prop({ type: String, trim: true })
  mfaSecret?: string;

  @Prop({ type: Date })
  lastLoginAt?: Date;

  @Prop({ type: Date })
  deletedAt?: Date;
}

// Create the schema from the class
export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before saving
UserSchema.pre('save', async function() {
  const user = this as UserDocument;
  // Only hash the password if it has been set (via the virtual setter)
  if (!user.get('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  // Hash the plain password from the virtual getter
  user.passwordHash = await bcrypt.hash(user.get('password') as string, salt);
});

// Method to compare password
UserSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.passwordHash);
};

// Virtual for password (write-only)
UserSchema.virtual('password')
  .set(function(this: UserDocument, value: string) {
    // We need to use any here to avoid TypeScript errors with dynamic properties
    (this as any)._password = value;
  })
  .get(function() {
    // We need to use any here to avoid TypeScript errors with dynamic properties
    return (this as any)._password;
  });

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });

// Configure toJSON and toObject to remove passwordHash and __v
UserSchema.set('toJSON', {
  virtuals: true,
  transform: function(_doc, ret) {
    // Create a new object without the fields we don't want
    const { passwordHash, __v, ...result } = ret;
    return result;
  }
});

UserSchema.set('toObject', {
  virtuals: true,
  transform: function(_doc, ret) {
    // Create a new object without the fields we don't want
    const { passwordHash, __v, ...result } = ret;
    return result;
  }
});