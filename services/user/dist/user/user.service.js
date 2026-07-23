"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./entities/user.entity");
let UserService = UserService_1 = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async createUser(dto) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email: dto.email.toLowerCase() },
            });
            if (existingUser) {
                throw new common_1.ConflictException("User with this email already exists");
            }
            const passwordHash = await bcrypt.hash(dto.password, 10);
            const user = this.userRepository.create(Object.assign(Object.assign({}, dto), { email: dto.email.toLowerCase(), passwordHash }));
            const savedUser = await this.userRepository.save(user);
            const { passwordHash: __ } = savedUser, userWithoutPassword = __rest(savedUser, ["passwordHash"]);
            return userWithoutPassword;
        }
        catch (error) {
            this.logger.error(`Error creating user: ${error.message}`);
            throw error;
        }
    }
    async getUserProfile(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId, status: user_entity_1.UserStatus.ACTIVE },
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const { passwordHash: __ } = user, userWithoutPassword = __rest(user, ["passwordHash"]);
        return userWithoutPassword;
    }
    async updateUserProfile(userId, dto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        Object.assign(user, dto);
        const updatedUser = await this.userRepository.save(user);
        const { passwordHash: __ } = updatedUser, userWithoutPassword = __rest(updatedUser, ["passwordHash"]);
        return userWithoutPassword;
    }
    async changePassword(userId, dto) {
        if (dto.newPassword !== dto.confirmPassword) {
            throw new common_1.BadRequestException("Passwords do not match");
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException("Current password is incorrect");
        }
        const newPasswordHash = await bcrypt.hash(dto.newPassword, 10);
        user.passwordHash = newPasswordHash;
        await this.userRepository.save(user);
        return { message: "Password changed successfully" };
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email: email.toLowerCase() },
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const { passwordHash: __ } = user, userWithoutPassword = __rest(user, ["passwordHash"]);
        return userWithoutPassword;
    }
    async getUserByEmailWithPassword(email) {
        return await this.userRepository.findOne({
            where: { email: email.toLowerCase() },
            select: ["id", "email", "passwordHash", "role", "firstName", "lastName", "phone", "profileImage", "isMfaEnabled", "mfaSecret", "bio", "preferences", "metadata", "createdAt", "updatedAt", "lastLoginAt", "deletedAt"]
        });
    }
    async verifyPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
    async getUsersByRole(role) {
        const users = await this.userRepository.find({
            where: { role, status: user_entity_1.UserStatus.ACTIVE },
        });
        return users.map(user => {
            const { passwordHash: __ } = user, userWithoutPassword = __rest(user, ["passwordHash"]);
            return userWithoutPassword;
        });
    }
    async updateLastLogin(userId) {
        await this.userRepository.update(userId, {
            lastLoginAt: new Date(),
        });
    }
    async enableMfa(userId, mfaSecret) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        user.isMfaEnabled = true;
        user.mfaSecret = mfaSecret;
        await this.userRepository.save(user);
        return { message: "MFA enabled successfully" };
    }
    async disableMfa(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        user.isMfaEnabled = false;
        user.mfaSecret = undefined;
        await this.userRepository.save(user);
        return { message: "MFA disabled successfully" };
    }
    async suspendUser(userId, reason) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        user.status = user_entity_1.UserStatus.SUSPENDED;
        user.metadata = Object.assign(Object.assign({}, user.metadata), { suspendedReason: reason, suspendedAt: new Date() });
        await this.userRepository.save(user);
        return { message: "User suspended successfully" };
    }
    async unsuspendUser(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        user.status = user_entity_1.UserStatus.ACTIVE;
        await this.userRepository.save(user);
        return { message: "User unsuspended successfully" };
    }
    async deleteUser(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        user.deletedAt = new Date();
        user.status = user_entity_1.UserStatus.INACTIVE;
        await this.userRepository.save(user);
        return { message: "User deleted successfully" };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map