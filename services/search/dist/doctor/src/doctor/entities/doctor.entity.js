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
exports.DoctorEntity = exports.AvailabilityStatus = exports.DoctorSpecialization = void 0;
const typeorm_1 = require("typeorm");
var DoctorSpecialization;
(function (DoctorSpecialization) {
    DoctorSpecialization["CARDIOLOGY"] = "cardiology";
    DoctorSpecialization["ORTHOPEDICS"] = "orthopedics";
    DoctorSpecialization["NEUROLOGY"] = "neurology";
    DoctorSpecialization["DERMATOLOGY"] = "dermatology";
    DoctorSpecialization["PEDIATRICS"] = "pediatrics";
    DoctorSpecialization["PSYCHIATRY"] = "psychiatry";
    DoctorSpecialization["GENERAL_PRACTICE"] = "general_practice";
    DoctorSpecialization["OPHTHALMOLOGY"] = "ophthalmology";
    DoctorSpecialization["ENT"] = "ent";
    DoctorSpecialization["GASTROENTEROLOGY"] = "gastroenterology";
})(DoctorSpecialization || (exports.DoctorSpecialization = DoctorSpecialization = {}));
var AvailabilityStatus;
(function (AvailabilityStatus) {
    AvailabilityStatus["AVAILABLE"] = "available";
    AvailabilityStatus["BUSY"] = "busy";
    AvailabilityStatus["OFF"] = "off";
})(AvailabilityStatus || (exports.AvailabilityStatus = AvailabilityStatus = {}));
let DoctorEntity = class DoctorEntity {
};
exports.DoctorEntity = DoctorEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DoctorEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "hospitalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "licenseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "licenseNumber2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: DoctorSpecialization }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "qualifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], DoctorEntity.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 3, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], DoctorEntity.prototype, "averageRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], DoctorEntity.prototype, "totalRatings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], DoctorEntity.prototype, "consultationCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], DoctorEntity.prototype, "consultationFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AvailabilityStatus, default: AvailabilityStatus.AVAILABLE }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "availabilityStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time", nullable: true }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "workStartTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time", nullable: true }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "workEndTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-array", default: "MON,TUE,WED,THU,FRI" }),
    __metadata("design:type", Array)
], DoctorEntity.prototype, "workingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], DoctorEntity.prototype, "preferences", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], DoctorEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], DoctorEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DoctorEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DoctorEntity.prototype, "updatedAt", void 0);
exports.DoctorEntity = DoctorEntity = __decorate([
    (0, typeorm_1.Entity)("doctors"),
    (0, typeorm_1.Index)(["userId"], { unique: true }),
    (0, typeorm_1.Index)(["specialization"]),
    (0, typeorm_1.Index)(["hospitalId"])
], DoctorEntity);
//# sourceMappingURL=doctor.entity.js.map