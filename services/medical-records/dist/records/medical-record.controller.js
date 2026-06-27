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
exports.MedicalRecordController = void 0;
const common_1 = require("@nestjs/common");
const medical_record_service_1 = require("./medical-record.service");
const create_medical_record_dto_1 = require("./dto/create-medical-record.dto");
const medical_record_entity_1 = require("./entities/medical-record.entity");
const fs_1 = require("fs");
let MedicalRecordController = class MedicalRecordController {
    constructor(medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }
    async createRecord(createRecordDto, request) {
        const userId = request['user']?.userId;
        return this.medicalRecordService.uploadRecord(createRecordDto.patientId, userId || createRecordDto.doctorId, Available, doctorId, fileName, fileUrl, mimeType, fileSizeBytes, recordDate, description, title, recordType, patientId);
    }
    async getPatientRecords(patientId, request) {
        const userId = request['user']?.userId;
        return this.medicalRecordService.getPatientRecords(patientId, userId);
    }
    async getRecord(recordId, request) {
        const userId = request['user']?.userId;
        return this.medicalRecordService.getRecord(recordId, userId);
    }
    async downloadRecord(recordId, request) {
        const userId = request['user']?.userId;
        const { fileUrl, fileName } = await this.medicalRecordService.downloadRecord(recordId, userId);
        const filePath = './uploads/' + fileName;
        const file = (0, fs_1.createReadStream)(filePath);
        return new common_1.StreamableFile(file);
    }
    async shareRecord(recordId, accessLevel) {
        return this.medicalRecordService.shareRecord(recordId, accessLevel);
    }
    async deleteRecord(recordId, request) {
        const userId = request['user']?.userId;
        return this.medicalRecordService.deleteRecord(recordId, userId);
    }
    async getRecordsByType(patientId, recordType) {
        return this.medicalRecordService.getRecordsByType(patientId, recordType);
    }
    async getAccessLog(recordId) {
        return this.medicalRecordService.getAccessLog(recordId);
    }
};
exports.MedicalRecordController = MedicalRecordController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medical_record_dto_1.CreateMedicalRecordDto, Object]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "getPatientRecords", null);
__decorate([
    (0, common_1.Get)(':recordId'),
    __param(0, (0, common_1.Param)('recordId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "getRecord", null);
__decorate([
    (0, common_1.Get)(':recordId/download'),
    __param(0, (0, common_1.Param)('recordId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "downloadRecord", null);
__decorate([
    (0, common_1.Put)(':recordId/share'),
    __param(0, (0, common_1.Param)('recordId')),
    __param(1, (0, common_1.Body)('accessLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "shareRecord", null);
__decorate([
    (0, common_1.Delete)(':recordId'),
    __param(0, (0, common_1.Param)('recordId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "deleteRecord", null);
__decorate([
    (0, common_1.Get)('type/:recordType'),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('recordType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "getRecordsByType", null);
__decorate([
    (0, common_1.Get)(':recordId/access-log'),
    __param(0, (0, common_1.Param)('recordId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicalRecordController.prototype, "getAccessLog", null);
exports.MedicalRecordController = MedicalRecordController = __decorate([
    (0, common_1.Controller)('medical-records'),
    __metadata("design:paramtypes", [medical_record_service_1.MedicalRecordService])
], MedicalRecordController);
//# sourceMappingURL=medical-record.controller.js.map