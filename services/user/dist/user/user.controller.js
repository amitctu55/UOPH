"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async registerUser(dto) {
        this.logger.log(`Registering user: ${dto.email}`);
        return this.userService.createUser(dto);
    }
    async getUserProfile(userId) {
        this.logger.log(`Getting profile for user: ${userId}`);
        return this.userService.getUserProfile(userId);
    }
    async updateUserProfile(userId, dto) {
        this.logger.log(`Updating profile for user: ${userId}`);
        return this.userService.updateUserProfile(userId, dto);
    }
    async changePassword(userId, dto) {
        this.logger.log(`Changing password for user: ${userId}`);
        return this.userService.changePassword(userId, dto);
    }
    async enableMfa(userId, mfaSecret) {
        this.logger.log(`Enabling MFA for user: ${userId}`);
        return this.userService.enableMfa(userId, mfaSecret);
    }
    async disableMfa(userId) {
        this.logger.log(`Disabling MFA for user: ${userId}`);
        return this.userService.disableMfa(userId);
    }
    async suspendUser(userId, reason) {
        this.logger.log(`Suspending user: ${userId}`);
        return this.userService.suspendUser(userId, reason);
    }
    async unsuspendUser(userId) {
        this.logger.log(`Unsuspending user: ${userId}`);
        return this.userService.unsuspendUser(userId);
    }
    async deleteUser(userId) {
        this.logger.log(`Deleting user: ${userId}`);
        return this.userService.deleteUser(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: "Register new user" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "User registered successfully" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Get)(":id/profile"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get user profile" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User profile retrieved" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Put)(":id/profile"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Update user profile" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Profile updated" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserProfile", null);
__decorate([
    (0, common_1.Post)(":id/change-password"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Change user password" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Password changed" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)(":id/mfa/enable"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Enable MFA for user" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "MFA enabled" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("mfaSecret")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "enableMfa", null);
__decorate([
    (0, common_1.Post)(":id/mfa/disable"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Disable MFA for user" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "MFA disabled" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "disableMfa", null);
__decorate([
    (0, common_1.Post)(":id/suspend"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Suspend user account" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User suspended" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("reason")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "suspendUser", null);
__decorate([
    (0, common_1.Post)(":id/unsuspend"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Unsuspend user account" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User unsuspended" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unsuspendUser", null);
__decorate([
    (0, common_1.Post)(":id/delete"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Delete user account" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User deleted" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)("Users"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map