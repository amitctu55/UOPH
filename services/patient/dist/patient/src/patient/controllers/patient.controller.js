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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patient_service_1 = require("../services/patient.service");
const create_patient_dto_1 = require("../dto/create-patient.dto");
const update_patient_dto_1 = require("../dto/update-patient.dto");
const jwt_guard_1 = require("../../../../auth/src/auth/jwt.guard");
let PatientController = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    async createPatient(dto, _request) {
        return this.patientService.createPatient(dto);
    }
    async getPatientById(id) {
        return this.patientService.getPatientById(id);
    }
    async getPatientByUserId(userId) {
        return this.patientService.getPatientByUserId(userId);
    }
    async updatePatient(id, dto) {
        return this.patientService.updatePatient(id, dto);
    }
    async deactivatePatient(id) {
        return this.patientService.deactivatePatient(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: "Create patient profile" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Patient profile created" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid input" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "createPatient", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get patient by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Patient found" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Patient not found" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPatientById", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    (0, swagger_1.ApiOperation)({ summary: "Get patient by user ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Patient found" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Patient not found" }),
    __param(0, (0, common_1.Param)("userId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPatientByUserId", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Update patient information" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Patient updated" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Patient not found" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_patient_dto_1.UpdatePatientDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updatePatient", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Deactivate patient" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Patient deactivated" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Patient not found" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "deactivatePatient", null);
PatientController = __decorate([
    (0, swagger_1.ApiTags)("Patients"),
    (0, common_1.Controller)("patients"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
exports.PatientController = PatientController;
//# sourceMappingURL=patient.controller.js.map