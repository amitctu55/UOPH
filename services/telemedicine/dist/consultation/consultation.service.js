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
var ConsultationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const consultation_entity_1 = require("./entities/consultation.entity");
let ConsultationService = ConsultationService_1 = class ConsultationService {
    constructor(consultationRepository) {
        this.consultationRepository = consultationRepository;
        this.logger = new common_1.Logger(ConsultationService_1.name);
    }
    async createConsultation(dto) {
        try {
            const consultation = this.consultationRepository.create(dto);
            return await this.consultationRepository.save(consultation);
        }
        catch (error) {
            this.logger.error(`Error creating consultation: ${error.message}`);
            throw error;
        }
    }
    async getConsultation(consultationId) {
        const consultation = await this.consultationRepository.findOne({
            where: { id: consultationId },
        });
        if (!consultation) {
            throw new common_1.NotFoundException("Consultation not found");
        }
        return consultation;
    }
    async getPatientConsultations(patientId) {
        return this.consultationRepository.find({
            where: { patientId },
            order: { scheduledAt: "DESC" },
        });
    }
    async getDoctorConsultations(doctorId) {
        return this.consultationRepository.find({
            where: { doctorId },
            order: { scheduledAt: "DESC" },
        });
    }
    async startConsultation(consultationId, dto) {
        const consultation = await this.consultationRepository.findOne({
            where: { id: consultationId },
        });
        if (!consultation) {
            throw new common_1.NotFoundException("Consultation not found");
        }
        if (consultation.status !== consultation_entity_1.ConsultationStatus.SCHEDULED) {
            throw new common_1.BadRequestException("Consultation cannot be started");
        }
        consultation.status = consultation_entity_1.ConsultationStatus.IN_PROGRESS;
        consultation.startedAt = new Date();
        consultation.meetingUrl = dto.meetingUrl;
        consultation.isRecorded = dto.recordSession || false;
        return await this.consultationRepository.save(consultation);
    }
    async endConsultation(consultationId, dto) {
        const consultation = await this.consultationRepository.findOne({
            where: { id: consultationId },
        });
        if (!consultation) {
            throw new common_1.NotFoundException("Consultation not found");
        }
        if (consultation.status !== consultation_entity_1.ConsultationStatus.IN_PROGRESS) {
            throw new common_1.BadRequestException("Consultation is not in progress");
        }
        consultation.status = consultation_entity_1.ConsultationStatus.COMPLETED;
        consultation.endedAt = new Date();
        consultation.notes = dto.notes;
        consultation.recordingUrl = dto.recordingUrl;
        consultation.vitals = dto.vitals;
        if (consultation.startedAt) {
            const durationMs = consultation.endedAt.getTime() - consultation.startedAt.getTime();
            consultation.durationMinutes = Math.round(durationMs / 60000);
        }
        return await this.consultationRepository.save(consultation);
    }
    async updateConsultation(consultationId, dto) {
        const consultation = await this.consultationRepository.findOne({
            where: { id: consultationId },
        });
        if (!consultation) {
            throw new common_1.NotFoundException("Consultation not found");
        }
        Object.assign(consultation, dto);
        return await this.consultationRepository.save(consultation);
    }
    async cancelConsultation(consultationId) {
        const consultation = await this.consultationRepository.findOne({
            where: { id: consultationId },
        });
        if (!consultation) {
            throw new common_1.NotFoundException("Consultation not found");
        }
        if (consultation.status !== consultation_entity_1.ConsultationStatus.SCHEDULED) {
            throw new common_1.BadRequestException("Only scheduled consultations can be cancelled");
        }
        consultation.status = consultation_entity_1.ConsultationStatus.CANCELLED;
        await this.consultationRepository.save(consultation);
        return { message: "Consultation cancelled" };
    }
    async getUpcomingConsultations(doctorId, days = 7) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        return this.consultationRepository.find({
            where: {
                doctorId,
                status: consultation_entity_1.ConsultationStatus.SCHEDULED,
            },
            order: { scheduledAt: "ASC" },
        });
    }
    async markNoShow(consultationId) {
        const consultation = await this.consultationRepository.findOne({
            where: { id: consultationId },
        });
        if (!consultation) {
            throw new common_1.NotFoundException("Consultation not found");
        }
        consultation.status = consultation_entity_1.ConsultationStatus.NO_SHOW;
        await this.consultationRepository.save(consultation);
        return { message: "Consultation marked as no-show" };
    }
};
exports.ConsultationService = ConsultationService;
exports.ConsultationService = ConsultationService = ConsultationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(consultation_entity_1.ConsultationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConsultationService);
//# sourceMappingURL=consultation.service.js.map