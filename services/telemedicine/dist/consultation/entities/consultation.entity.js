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
exports.ConsultationEntity = exports.ConsultationType = exports.ConsultationStatus = void 0;
const typeorm_1 = require("typeorm");
var ConsultationStatus;
(function (ConsultationStatus) {
    ConsultationStatus["SCHEDULED"] = "scheduled";
    ConsultationStatus["IN_PROGRESS"] = "in_progress";
    ConsultationStatus["COMPLETED"] = "completed";
    ConsultationStatus["CANCELLED"] = "cancelled";
    ConsultationStatus["NO_SHOW"] = "no_show";
})(ConsultationStatus || (exports.ConsultationStatus = ConsultationStatus = {}));
var ConsultationType;
(function (ConsultationType) {
    ConsultationType["VIDEO"] = "video";
    ConsultationType["AUDIO"] = "audio";
    ConsultationType["CHAT"] = "chat";
})(ConsultationType || (exports.ConsultationType = ConsultationType = {}));
let ConsultationEntity = class ConsultationEntity {
};
exports.ConsultationEntity = ConsultationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "appointmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ConsultationType }),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ConsultationStatus, default: ConsultationStatus.SCHEDULED }),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], ConsultationEntity.prototype, "scheduledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], ConsultationEntity.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], ConsultationEntity.prototype, "endedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], ConsultationEntity.prototype, "durationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "meetingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "recordingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ConsultationEntity.prototype, "prescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], ConsultationEntity.prototype, "vitals", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ConsultationEntity.prototype, "fee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], ConsultationEntity.prototype, "isRecorded", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], ConsultationEntity.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ConsultationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ConsultationEntity.prototype, "updatedAt", void 0);
exports.ConsultationEntity = ConsultationEntity = __decorate([
    (0, typeorm_1.Entity)("consultations"),
    (0, typeorm_1.Index)(["patientId"]),
    (0, typeorm_1.Index)(["doctorId"]),
    (0, typeorm_1.Index)(["status"])
], ConsultationEntity);
//# sourceMappingURL=consultation.entity.js.map