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
exports.ClinicalChartingEntity = exports.ClinicalDataType = void 0;
const typeorm_1 = require("typeorm");
var ClinicalDataType;
(function (ClinicalDataType) {
    ClinicalDataType["VITAL_SIGNS"] = "vital_signs";
    ClinicalDataType["MEDICATION"] = "medication";
    ClinicalDataType["ALLERGY"] = "allergy";
    ClinicalDataType["IMMUNIZATION"] = "immunization";
    ClinicalDataType["LAB_RESULT"] = "lab_result";
    ClinicalDataType["CLINICAL_NOTE"] = "clinical_note";
    ClinicalDataType["TREATMENT_PLAN"] = "treatment_plan";
})(ClinicalDataType = exports.ClinicalDataType || (exports.ClinicalDataType = {}));
let ClinicalChartingEntity = class ClinicalChartingEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ClinicalChartingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], ClinicalChartingEntity.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], ClinicalChartingEntity.prototype, "encounterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], ClinicalChartingEntity.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ClinicalDataType }),
    __metadata("design:type", String)
], ClinicalChartingEntity.prototype, "clinicalDataType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], ClinicalChartingEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ClinicalChartingEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], ClinicalChartingEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], ClinicalChartingEntity.prototype, "recordedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], ClinicalChartingEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", default: [] }),
    __metadata("design:type", Array)
], ClinicalChartingEntity.prototype, "accessLog", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ClinicalChartingEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ClinicalChartingEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], ClinicalChartingEntity.prototype, "deletedAt", void 0);
ClinicalChartingEntity = __decorate([
    (0, typeorm_1.Entity)("clinical_charting_data"),
    (0, typeorm_1.Index)(["patientId"]),
    (0, typeorm_1.Index)(["clinicalDataType"]),
    (0, typeorm_1.Index)(["createdAt"])
], ClinicalChartingEntity);
exports.ClinicalChartingEntity = ClinicalChartingEntity;
//# sourceMappingURL=clinical-charting.entity.js.map