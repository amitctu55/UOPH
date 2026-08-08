import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { PublicUser, User, UserDocument, UserRole, UserStatus } from "./user.schema";

export interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  private toPublic(user: UserDocument): PublicUser {
    return {
      id: String(user._id),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      status: user.status,
      isMfaEnabled: user.isMfaEnabled,
      lastLoginAt: user.lastLoginAt,
      createdAt: (user as UserDocument & { createdAt?: Date }).createdAt,
      updatedAt: (user as UserDocument & { updatedAt?: Date }).updatedAt,
    };
  }

  async createUser(dto: CreateUserInput): Promise<PublicUser> {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.userModel.findOne({ email }).select("+passwordHash");
    if (existing) {
      throw new ConflictException("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      email,
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      phone: dto.phone,
      passwordHash,
      role: dto.role ?? UserRole.PATIENT,
      status: UserStatus.ACTIVE,
      isMfaEnabled: false,
    });

    this.logger.log(`Created user ${user.email}`);
    return this.toPublic(user);
  }

  async getUserByEmailWithPassword(email: string): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase().trim() })
      .select("+passwordHash")
      .exec();
    if (!user || user.deletedAt) {
      return null;
    }
    return user;
  }

  async getUserById(userId: string): Promise<PublicUser> {
    const user = await this.userModel.findById(userId);
    if (!user || user.deletedAt) {
      throw new NotFoundException("User not found");
    }
    return this.toPublic(user);
  }

  async validatePassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async touchLastLogin(userId: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { lastLoginAt: new Date() });
  }

  async assertActive(user: UserDocument): Promise<void> {
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException("Account is not active");
    }
  }
}
