import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserEntity, UserRole, UserStatus } from "./entities/user.entity";
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(dto: CreateUserDto): Promise<Omit<UserEntity, "passwordHash">> {
    try {
      // Check if user exists
      const existingUser = await this.userRepository.findOne({
        where: { email: dto.email.toLowerCase() },
      });

      if (existingUser) {
        throw new ConflictException("User with this email already exists");
      }

      // Hash password
      const passwordHash = await bcrypt.hash(dto.password, 10);

      // Create user
      const user = this.userRepository.create({
        ...dto,
        email: dto.email.toLowerCase(),
        passwordHash,
      });

      const savedUser = await this.userRepository.save(user);
      const { passwordHash: __, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error: any) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  async getUserProfile(userId: string): Promise<Omit<UserEntity, "passwordHash">> {
    const user = await this.userRepository.findOne({
      where: { id: userId, status: UserStatus.ACTIVE },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { passwordHash: __, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUserProfile(
    userId: string,
    dto: UpdateUserDto
  ): Promise<Omit<UserEntity, "passwordHash">> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    Object.assign(user, dto);
    const updatedUser = await this.userRepository.save(user);
    const { passwordHash: __, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<{ message: string }> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException("Current password is incorrect");
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(dto.newPassword, 10);
    user.passwordHash = newPasswordHash;

    await this.userRepository.save(user);
    return { message: "Password changed successfully" };
  }

  async getUserByEmail(email: string): Promise<Omit<UserEntity, "passwordHash">> {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { passwordHash: __, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async getUsersByRole(role: UserRole): Promise<Omit<UserEntity, "passwordHash">[]> {
    const users = await this.userRepository.find({
      where: { role, status: UserStatus.ACTIVE },
    });

    return users.map(user => {
      const { passwordHash: __, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      lastLoginAt: new Date(),
    });
  }

  async enableMfa(userId: string, mfaSecret: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.isMfaEnabled = true;
    user.mfaSecret = mfaSecret;
    await this.userRepository.save(user);

    return { message: "MFA enabled successfully" };
  }

  async disableMfa(userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.isMfaEnabled = false;
    user.mfaSecret = undefined;
    await this.userRepository.save(user);

    return { message: "MFA disabled successfully" };
  }

  async suspendUser(userId: string, reason: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.status = UserStatus.SUSPENDED;
    user.metadata = { ...user.metadata, suspendedReason: reason, suspendedAt: new Date() };
    await this.userRepository.save(user);

    return { message: "User suspended successfully" };
  }

  async unsuspendUser(userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.status = UserStatus.ACTIVE;
    await this.userRepository.save(user);

    return { message: "User unsuspended successfully" };
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.deletedAt = new Date();
    user.status = UserStatus.INACTIVE;
    await this.userRepository.save(user);

    return { message: "User deleted successfully" };
  }
}