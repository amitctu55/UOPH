import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User, UserDocument, UserRole, UserStatus } from "@libs/shared/src/database/user.model";
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async createUser(dto: CreateUserDto): Promise<Omit<UserDocument, "passwordHash">> {
    try {
      // Check if user exists
      const existingUser = await this.userModel.findOne({
        email: dto.email.toLowerCase(),
      });

      if (existingUser) {
        throw new ConflictException("User with this email already exists");
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(dto.password, salt);

      // Create user
      const user = new this.userModel({
        ...dto,
        email: dto.email.toLowerCase(),
        passwordHash,
      });

      const savedUser = await user.save();

      // Remove password from return object
      const { passwordHash: _, ...userWithoutPassword } = savedUser.toObject();
      return userWithoutPassword;
    } catch (error: any) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  async getUserProfile(userId: string): Promise<Omit<UserDocument, "passwordHash">> {
    const user = await this.userModel.findOne({
      _id: userId,
      status: UserStatus.ACTIVE,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { passwordHash: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  async updateUserProfile(
    userId: string,
    dto: UpdateUserDto
  ): Promise<Omit<UserDocument, "passwordHash">> {
    const user = await this.userModel.findOne({
      _id: userId,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    Object.assign(user, dto);
    const updatedUser = await user.save();

    const { passwordHash: _, ...userWithoutPassword } = updatedUser.toObject();
    return userWithoutPassword;
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<{ message: string }> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException("Current password is incorrect");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(dto.newPassword, salt);
    user.passwordHash = newPasswordHash;

    await user.save();
    return { message: "Password changed successfully" };
  }

  async getUserByEmail(email: string): Promise<Omit<UserDocument, "passwordHash">> {
    const user = await this.userModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { passwordHash: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  async getUserByEmailWithPassword(email: string): Promise<UserDocument | null> {
    return await this.userModel
      .findOne({
        email: email.toLowerCase(),
      })
      .select("+passwordHash");
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async getUsersByRole(role: UserRole): Promise<Omit<UserDocument, "passwordHash">[]> {
    const users = await this.userModel.find({
      role,
      status: UserStatus.ACTIVE,
    });

    return users.map(user => {
      const { passwordHash: _, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { lastLoginAt: new Date() });
  }

  async enableMfa(userId: string, mfaSecret: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.isMfaEnabled = true;
    user.mfaSecret = mfaSecret;
    await user.save();

    return { message: "MFA enabled successfully" };
  }

  async disableMfa(userId: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.isMfaEnabled = false;
    user.mfaSecret = undefined;
    await user.save();

    return { message: "MFA disabled successfully" };
  }

  async suspendUser(userId: string, reason: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.status = UserStatus.SUSPENDED;
    user.metadata = { ...user.metadata, suspendedReason: reason, suspendedAt: new Date() };
    await user.save();

    return { message: "User suspended successfully" };
  }

  async unsuspendUser(userId: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.status = UserStatus.ACTIVE;
    await user.save();

    return { message: "User unsuspended successfully" };
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.deletedAt = new Date();
    user.status = UserStatus.INACTIVE;
    await user.save();

    return { message: "User deleted successfully" };
  }
}
