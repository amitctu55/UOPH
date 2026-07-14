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
var ClinicalChartingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalChartingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const clinical_charting_entity_1 = require("./entities/clinical-charting.entity");
let ClinicalChartingService = ClinicalChartingService_1 = class ClinicalChartingService {
    constructor(clinicalChartingRepository) {
        this.clinicalChartingRepository = clinicalChartingRepository;
        this.logger = new common_1.Logger(ClinicalChartingService_1.name);
    }
    async createClincalChartingData(dto) {
        try {
            const clinicalData = this.clinicalChartingRepository.create({
                ...dto,
                recordedAt: dto.encounteredAt ?? new Date(),
                accessLog: [
                    {
                        userId: dto.providerId,
                        accessedAt: new Date().toISOString(),
                        action: "CREATE",
                    },
                ],
            });
            const saved = await this.clinicalChartingRepository.save(clinicalData);
            this.logAccess(saved.id, dto.providerId, "CREATE", "Clinical data created");
            return saved;
        }
        catch (error) {
            this.logger.error(`Error creating clinical charting data: ${error.message}`);
            throw error;
        }
    }
    async getClinicalDataById(id, requestingUserId) {
        const clinicalData = await this.clinicalChartingRepository.findOne({
            where: { id, deletedAt: null },
        });
        if (!clinicalData) {
            throw new common_1.NotFoundException("Clinical data not found");
        }
        if (clinicalData.patientId !== requestingUserId &&
            clinicalData.providerId !== requestingUserId) {
            throw new common_1.ForbiddenException("Access denied to this clinical data");
        }
        this.logAccess(clinicalData.id, requestingUserId, "VIEW", "Clinical data viewed");
        return clinicalData;
    }
    async getClinicalDataByPatientId(patientId, requestingUserId) {
        if (patientId !== requestingUserId) {
            this.logger.warn(`User ${requestingUserId} accessing clinical data for patient ${patientId}`);
        }
        const clinicalData = await this.clinicalChartingRepository.find({
            where: { patientId, deletedAt: null },
            order: { recordedAt: "DESC" },
        });
        clinicalData.forEach((data) => {
            this.logAccess(data.id, requestingUserId, "LIST_VIEW", "Clinical data list viewed");
        });
        return clinicalData;
    }
    async getClinicalDataByType(patientId, clinicalDataType, requestingUserId) {
        if (patientId !== requestingUserId) {
            this.logger.warn(`User ${requestingUserId} accessing ${clinicalDataType} data for patient ${patientId}`);
        }
        const clinicalData = await this.clinicalChartingRepository.find({
            where: {
                patientId,
                clinicalDataType,
                deletedAt: null,
            },
            order: { recordedAt: "DESC" },
        });
        clinicalData.forEach((data) => {
            this.logAccess(data.id, requestingUserId, "FILTERED_VIEW", `Clinical data filtered by type: ${clinicalDataType}`);
        });
        return clinicalData;
    }
    async updateClinicalData(id, dto, requestingUserId) {
        const clinicalData = await this.clinicalChartingRepository.findOne({
            where: { id, deletedAt: null },
        });
        if (!clinicalData) {
            throw new common_1.NotFoundException("Clinical data not found");
        }
        if (clinicalData.providerId !== requestingUserId &&
            clinicalData.patientId !== requestingUserId) {
            throw new common_1.ForbiddenException("Access denied to update this clinical data");
        }
        Object.assign(clinicalData, dto);
        clinicalData.updatedAt = new Date();
        clinicalData.accessLog = [
            ...clinicalData.accessLog,
            {
                userId: requestingUserId,
                accessedAt: new Date().toISOString(),
                action: "UPDATE",
            },
        ];
        const updated = await this.clinicalChartingRepository.save(clinicalData);
        this.logAccess(updated.id, requestingUserId, "UPDATE", "Clinical data updated");
        return updated;
    }
    async deactivateClinicalData(id, requestingUserId) {
        const clinicalData = await this.clinicalChartingRepository.findOne({
            where: { id },
        });
        if (!clinicalData) {
            throw new common_1.NotFoundException("Clinical data not found");
        }
        if (clinicalData.providerId !== requestingUserId &&
            clinicalData.patientId !== requestingUserId) {
            throw new common_1.ForbiddenException("Access denied to deactivate this clinical data");
        }
        clinicalData.isActive = false;
        clinicalData.deletedAt = new Date();
        clinicalData.accessLog = [
            ...clinicalData.accessLog,
            {
                userId: requestingUserId,
                accessedAt: new Date().toISOString(),
                action: "DEACTIVATE",
            },
        ];
        await this.clinicalChartingRepository.save(clinicalData);
        this.logAccess(id, requestingUserId, "DEACTIVATE", "Clinical data deactivated");
        return { message: "Clinical data deactivated successfully" };
    }
    logAccess(clinicalDataId, userId, action, details) {
        this.logger.log(`[ACCESS LOG] ClinicalData: ${clinicalDataId}, User: ${userId}, Action: ${action}, Details: ${details}`);
    }
};
ClinicalChartingService = ClinicalChartingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clinical_charting_entity_1.ClinicalChartingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClinicalChartingService);
exports.ClinicalChartingService = ClinicalChartingService;
//# sourceMappingURL=clinical-charting.service.js.map