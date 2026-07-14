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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalChartingController = void 0;
const common_1 = require("@nestjs/common");
const clinical_charting_service_1 = require("./services/clinical-charting.service");
const create_clinical_charting_dto_1 = require("./dtos/create-clinical-charting.dto");
const update_clinical_charting_dto_1 = require("./dtos/update-clinical-charting.dto");
const clinical_charting_entity_1 = require("./entities/clinical-charting.entity");
const jwt_guard_1 = require("../../auth/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
let ClinicalChartingController = class ClinicalChartingController {
    constructor(clinicalChartingService) {
        this.clinicalChartingService = clinicalChartingService;
    }
    async createClinicalData(createClinicalDataDto, req) {
        createClinicalDataDto.providerId = req.user.userId;
        return this.clinicalChartingService.createClincalChartingData(createClinicalDataDto);
    }
    async getClinicalDataById(id, req) {
        return this.clinicalChartingService.getClinicalDataById(id, req.user.userId);
    }
    async getClinicalDataByPatientId(patientId, req) {
        return this.clinicalChartingService.getClinicalDataByPatientId(patientId, req.user.userId);
    }
    async getClinicalDataByType(patientId, type, req) {
        return this.clinicalChartingService.getClinicalDataByType(patientId, type, req.user.userId);
    }
    async updateClinicalData(id, updateClinicalDataDto, req) {
        return this.clinicalChartingService.updateClinicalData(id, updateClinicalDataDto, req.user.userId);
    }
    async deactivateClinicalData(id, req) {
        return this.clinicalChartingService.deactivateClinicalData(id, req.user.userId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: "Create clinical charting data" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Clinical data created successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid input" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_clinical_charting_dto_1.CreateClinicalChartingDataDto !== "undefined" && create_clinical_charting_dto_1.CreateClinicalChartingDataDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ClinicalChartingController.prototype, "createClinicalData", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get clinical charting data by ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Clinical data retrieved successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Clinical data not found" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClinicalChartingController.prototype, "getClinicalDataById", null);
__decorate([
    (0, common_1.Get)("patient/:patientId"),
    (0, swagger_1.ApiOperation)({ summary: "Get all clinical charting data for a patient" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Clinical data retrieved successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Access denied" }),
    __param(0, (0, common_1.Param)("patientId", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClinicalChartingController.prototype, "getClinicalDataByPatientId", null);
__decorate([
    (0, common_1.Get)("patient/:patientId/type/:type"),
    (0, swagger_1.ApiOperation)({ summary: "Get clinical charting data by type for a patient" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Clinical data retrieved successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Access denied" }),
    __param(0, (0, common_1.Param)("patientId", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)("type")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof clinical_charting_entity_1.ClinicalDataType !== "undefined" && clinical_charting_entity_1.ClinicalDataType) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], ClinicalChartingController.prototype, "getClinicalDataByType", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update clinical charting data" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Clinical data updated successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Clinical data not found" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Access denied" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof update_clinical_charting_dto_1.UpdateClinicalChartingDataDto !== "undefined" && update_clinical_charting_dto_1.UpdateClinicalChartingDataDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], ClinicalChartingController.prototype, "updateClinicalData", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Deactivate clinical charting data" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Clinical data deactivated successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Clinical data not found" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Access denied" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClinicalChartingController.prototype, "deactivateClinicalData", null);
ClinicalChartingController = __decorate([
    (0, swagger_1.ApiTags)("Clinical Charting"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)("clinical-charting"),
    __metadata("design:paramtypes", [typeof (_a = typeof clinical_charting_service_1.ClinicalChartingService !== "undefined" && clinical_charting_service_1.ClinicalChartingService) === "function" ? _a : Object])
], ClinicalChartingController);
exports.ClinicalChartingController = ClinicalChartingController;
//# sourceMappingURL=clinical-charting.controller.js.map