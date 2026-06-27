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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../user/user.service");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../user/entities/user.entity");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login(loginDto) {
        const user = await this.userService.getUserByEmail(loginDto.username);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const passwordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const payload = { sub: user.id, username: user.email, roles: [user.role] };
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
            }),
        };
    }
    async register(registerDto) {
        const existing = await this.userService.getUserByEmail(registerDto.email);
        if (existing) {
            throw new common_1.ConflictException("User with this email already exists");
        }
        const username = registerDto.username.trim();
        let firstName = username.length >= 2 ? username : "User";
        let lastName = "User";
        if (firstName.length < 2)
            firstName = "User";
        if (lastName.length < 2)
            lastName = "User";
        const createUserDto = {
            email: registerDto.email.toLowerCase(),
            firstName,
            lastName,
            password: registerDto.password,
            phone: undefined,
            role: user_entity_1.UserRole.PATIENT,
        };
        const user = await this.userService.createUser(createUserDto);
        const { passwordHash: _, ...userWithoutPassword } = user;
        const payload = { sub: user.id, username: user.email, roles: [user.role] };
        return {
            ...userWithoutPassword,
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
            }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map