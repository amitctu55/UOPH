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
var MedicalRecordService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
const medical_record_entity_1 = require("./entities/medical-record.entity");
let MedicalRecordService = MedicalRecordService_1 = class MedicalRecordService {
    constructor(recordRepository) {
        this.recordRepository = recordRepository;
        this.logger = new common_1.Logger(MedicalRecordService_1.name);
    }
    async uploadRecord(patientId, doctorId, recordType, title, fileUrl, fileName) {
        try {
            const record = this.recordRepository.create({
                patientId,
                doctorId,
                recordType,
                title,
                fileUrl,
                fileName,
                isEncrypted: true,
            });
            const saved = await this.recordRepository.save(record);
            this.logAccess(saved.id, doctorId, "UPLOAD", "Doctor uploaded record");
            return saved;
        }
        catch (error) {
            this.logger.error(`Error uploading record: ${error.message}`);
            throw error;
        }
    }
    async getPatientRecords(patientId, requestingUserId) {
        const records = await this.recordRepository.find({
            where: { patientId, deletedAt: (0, typeorm_1.IsNull)() },
            order: { recordDate: "DESC" },
        });
        return records.filter(record => {
            if (record.patientId === requestingUserId)
                return true;
            if (record.accessLevel === medical_record_entity_1.AccessLevel.SHARED)
                return true;
            if (record.doctorId === requestingUserId && record.accessLevel === medical_record_entity_1.AccessLevel.DOCTOR_ONLY) {
                return true;
            }
            return false;
        });
    }
    async getRecord(recordId, requestingUserId) {
        const record = await this.recordRepository.findOne({
            where: { id: recordId, deletedAt: (0, typeorm_1.IsNull)() },
        });
        if (!record) {
            throw new common_1.NotFoundException("Medical record not found");
        }
        if (record.patientId !== requestingUserId &&
            record.doctorId !== requestingUserId &&
            record.accessLevel !== medical_record_entity_1.AccessLevel.SHARED) {
            throw new common_1.ForbiddenException("Access denied to this record");
        }
        this.logAccess(recordId, requestingUserId, "VIEW", "Record viewed");
        return record;
    }
    async downloadRecord(recordId, requestingUserId) {
        const record = await this.getRecord(recordId, requestingUserId);
        this.logAccess(recordId, requestingUserId, "DOWNLOAD", "Record downloaded");
        return {
            fileUrl: record.fileUrl,
            fileName: record.fileName,
        };
    }
    async shareRecord(recordId, accessLevel) {
        const record = await this.recordRepository.findOne({
            where: { id: recordId },
        });
        if (!record) {
            throw new common_1.NotFoundException("Medical record not found");
        }
        record.accessLevel = accessLevel;
        this.logAccess(recordId, "SYSTEM", "SHARE", `Shared with access level: ${accessLevel}`);
        return await this.recordRepository.save(record);
    }
    async deleteRecord(recordId, requestingUserId) {
        const record = await this.recordRepository.findOne({
            where: { id: recordId },
        });
        if (!record) {
            throw new common_1.NotFoundException("Medical record not found");
        }
        if (record.patientId !== requestingUserId && record.doctorId !== requestingUserId) {
            throw new common_1.ForbiddenException("Cannot delete this record");
        }
        record.deletedAt = new Date();
        this.logAccess(recordId, requestingUserId, "DELETE", "Record deleted");
        await this.recordRepository.save(record);
        return { message: "Record deleted successfully" };
    }
    async getRecordsByType(patientId, recordType) {
        return this.recordRepository.find({
            where: { patientId, recordType, deletedAt: (0, typeorm_1.IsNull)() },
            order: { recordDate: "DESC" },
        });
    }
    async getAccessLog(recordId) {
        const record = await this.recordRepository.findOne({
            where: { id: recordId },
        });
        if (!record) {
            throw new common_1.NotFoundException("Medical record not found");
        }
        return record.accessLog || [];
    }
    logAccess(recordId, userId, action, details) {
        this.logger.log(`[ACCESS LOG] Record: ${recordId}, User: ${userId}, Action: ${action}, Details: ${details}`);
    }
};
exports.MedicalRecordService = MedicalRecordService;
exports.MedicalRecordService = MedicalRecordService = MedicalRecordService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(medical_record_entity_1.MedicalRecordEntity)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], MedicalRecordService);
//# sourceMappingURL=medical-record.service.js.map