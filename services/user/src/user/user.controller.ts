import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpCode,
  Logger,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from "./dto/user.dto";

@ApiTags("Users")
@Controller("users")
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post("register")
  @HttpCode(201)
  @ApiOperation({ summary: "Register new user" })
  @ApiResponse({ status: 201, description: "User registered successfully" })
  async registerUser(@Body() dto: CreateUserDto) {
    this.logger.log(`Registering user: ${dto.email}`);
    return this.userService.createUser(dto);
  }

  @Get(":id/profile")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user profile" })
  @ApiResponse({ status: 200, description: "User profile retrieved" })
  async getUserProfile(@Param("id") userId: string) {
    this.logger.log(`Getting profile for user: ${userId}`);
    return this.userService.getUserProfile(userId);
  }

  @Put(":id/profile")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Update user profile" })
  @ApiResponse({ status: 200, description: "Profile updated" })
  async updateUserProfile(@Param("id") userId: string, @Body() dto: UpdateUserDto) {
    this.logger.log(`Updating profile for user: ${userId}`);
    return this.userService.updateUserProfile(userId, dto);
  }

  @Post(":id/change-password")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Change user password" })
  @ApiResponse({ status: 200, description: "Password changed" })
  async changePassword(@Param("id") userId: string, @Body() dto: ChangePasswordDto) {
    this.logger.log(`Changing password for user: ${userId}`);
    return this.userService.changePassword(userId, dto);
  }

  @Post(":id/mfa/enable")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Enable MFA for user" })
  @ApiResponse({ status: 200, description: "MFA enabled" })
  async enableMfa(@Param("id") userId: string, @Body("mfaSecret") mfaSecret: string) {
    this.logger.log(`Enabling MFA for user: ${userId}`);
    return this.userService.enableMfa(userId, mfaSecret);
  }

  @Post(":id/mfa/disable")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Disable MFA for user" })
  @ApiResponse({ status: 200, description: "MFA disabled" })
  async disableMfa(@Param("id") userId: string) {
    this.logger.log(`Disabling MFA for user: ${userId}`);
    return this.userService.disableMfa(userId);
  }

  @Post(":id/suspend")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Suspend user account" })
  @ApiResponse({ status: 200, description: "User suspended" })
  async suspendUser(@Param("id") userId: string, @Body("reason") reason: string) {
    this.logger.log(`Suspending user: ${userId}`);
    return this.userService.suspendUser(userId, reason);
  }

  @Post(":id/unsuspend")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Unsuspend user account" })
  @ApiResponse({ status: 200, description: "User unsuspended" })
  async unsuspendUser(@Param("id") userId: string) {
    this.logger.log(`Unsuspending user: ${userId}`);
    return this.userService.unsuspendUser(userId);
  }

  @Post(":id/delete")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Delete user account" })
  @ApiResponse({ status: 200, description: "User deleted" })
  async deleteUser(@Param("id") userId: string) {
    this.logger.log(`Deleting user: ${userId}`);
    return this.userService.deleteUser(userId);
  }
}
