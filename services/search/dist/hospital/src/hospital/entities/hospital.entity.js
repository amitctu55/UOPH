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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalEntity = void 0;
const typeorm_1 = require("typeorm");
let HospitalEntity = class HospitalEntity {
};
exports.HospitalEntity = HospitalEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], HospitalEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, unique: true, nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: false }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], HospitalEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], HospitalEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "websiteUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], HospitalEntity.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], HospitalEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], HospitalEntity.prototype, "verifiedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HospitalEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], HospitalEntity.prototype, "updatedAt", void 0);
exports.HospitalEntity = HospitalEntity = __decorate([
    (0, typeorm_1.Entity)("hospitals"),
    (0, typeorm_1.Index)(["city"]),
    (0, typeorm_1.Index)(["is_verified"])
], HospitalEntity);
//# sourceMappingURL=hospital.entity.js.map