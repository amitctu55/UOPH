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
exports.MedicalRecordEntity = exports.AccessLevel = exports.RecordType = void 0;
const typeorm_1 = require("typeorm");
var RecordType;
(function (RecordType) {
    RecordType["PRESCRIPTION"] = "prescription";
    RecordType["LAB_REPORT"] = "lab_report";
    RecordType["SCAN_IMAGE"] = "scan_image";
    RecordType["DIAGNOSIS"] = "diagnosis";
    RecordType["TREATMENT_PLAN"] = "treatment_plan";
    RecordType["VACCINATION"] = "vaccination";
    RecordType["ALLERGY"] = "allergy";
    RecordType["OTHER"] = "other";
})(RecordType || (exports.RecordType = RecordType = {}));
var AccessLevel;
(function (AccessLevel) {
    AccessLevel["PRIVATE"] = "private";
    AccessLevel["DOCTOR_ONLY"] = "doctor_only";
    AccessLevel["HOSPITAL_STAFF"] = "hospital_staff";
    AccessLevel["SHARED"] = "shared";
})(AccessLevel || (exports.AccessLevel = AccessLevel = {}));
let MedicalRecordEntity = class MedicalRecordEntity {
};
exports.MedicalRecordEntity = MedicalRecordEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "hospitalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: RecordType }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "recordType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], MedicalRecordEntity.prototype, "fileSizeBytes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], MedicalRecordEntity.prototype, "recordDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AccessLevel, default: AccessLevel.DOCTOR_ONLY }),
    __metadata("design:type", String)
], MedicalRecordEntity.prototype, "accessLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], MedicalRecordEntity.prototype, "isEncrypted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], MedicalRecordEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", default: "[]" }),
    __metadata("design:type", Array)
], MedicalRecordEntity.prototype, "accessLog", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MedicalRecordEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MedicalRecordEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], MedicalRecordEntity.prototype, "deletedAt", void 0);
exports.MedicalRecordEntity = MedicalRecordEntity = __decorate([
    (0, typeorm_1.Entity)("medical_records"),
    (0, typeorm_1.Index)(["patientId"]),
    (0, typeorm_1.Index)(["doctorId"]),
    (0, typeorm_1.Index)(["recordType"])
], MedicalRecordEntity);
//# sourceMappingURL=medical-record.entity.js.map