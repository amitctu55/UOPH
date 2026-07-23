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
var ConsultationController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const consultation_service_1 = require("./consultation.service");
const consultation_dto_1 = require("./dto/consultation.dto");
let ConsultationController = ConsultationController_1 = class ConsultationController {
    constructor(consultationService) {
        this.consultationService = consultationService;
        this.logger = new common_1.Logger(ConsultationController_1.name);
    }
    async createConsultation(dto) {
        this.logger.log(`Creating consultation`);
        return this.consultationService.createConsultation(dto);
    }
    async getConsultation(consultationId) {
        this.logger.log(`Getting consultation: ${consultationId}`);
        return this.consultationService.getConsultation(consultationId);
    }
    async getPatientConsultations(patientId) {
        return this.consultationService.getPatientConsultations(patientId);
    }
    async getDoctorConsultations(doctorId) {
        return this.consultationService.getDoctorConsultations(doctorId);
    }
    async startConsultation(consultationId, dto) {
        this.logger.log(`Starting consultation: ${consultationId}`);
        return this.consultationService.startConsultation(consultationId, dto);
    }
    async endConsultation(consultationId, dto) {
        this.logger.log(`Ending consultation: ${consultationId}`);
        return this.consultationService.endConsultation(consultationId, dto);
    }
    async updateConsultation(consultationId, dto) {
        this.logger.log(`Updating consultation: ${consultationId}`);
        return this.consultationService.updateConsultation(consultationId, dto);
    }
    async cancelConsultation(consultationId) {
        this.logger.log(`Cancelling consultation: ${consultationId}`);
        return this.consultationService.cancelConsultation(consultationId);
    }
};
exports.ConsultationController = ConsultationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: "Create consultation" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consultation_dto_1.CreateConsultationDto]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "createConsultation", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get consultation details" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "getConsultation", null);
__decorate([
    (0, common_1.Get)("patient/:patientId"),
    (0, swagger_1.ApiOperation)({ summary: "Get patient consultations" }),
    __param(0, (0, common_1.Param)("patientId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "getPatientConsultations", null);
__decorate([
    (0, common_1.Get)("doctor/:doctorId"),
    (0, swagger_1.ApiOperation)({ summary: "Get doctor consultations" }),
    __param(0, (0, common_1.Param)("doctorId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "getDoctorConsultations", null);
__decorate([
    (0, common_1.Post)(":id/start"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Start consultation" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, consultation_dto_1.StartConsultationDto]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "startConsultation", null);
__decorate([
    (0, common_1.Post)(":id/end"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "End consultation" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, consultation_dto_1.EndConsultationDto]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "endConsultation", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Update consultation" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, consultation_dto_1.UpdateConsultationDto]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "updateConsultation", null);
__decorate([
    (0, common_1.Post)(":id/cancel"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Cancel consultation" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "cancelConsultation", null);
exports.ConsultationController = ConsultationController = ConsultationController_1 = __decorate([
    (0, swagger_1.ApiTags)("Consultations"),
    (0, common_1.Controller)("consultations"),
    __metadata("design:paramtypes", [consultation_service_1.ConsultationService])
], ConsultationController);
//# sourceMappingURL=consultation.controller.js.map