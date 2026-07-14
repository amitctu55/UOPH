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
var PatientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("./entities/patient.entity");
let PatientService = PatientService_1 = class PatientService {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
        this.logger = new common_1.Logger(PatientService_1.name);
    }
    async createPatient(dto) {
        try {
            const existingPatient = await this.patientRepository.findOne({
                where: { userId: dto.userId },
            });
            if (existingPatient) {
                throw new common_1.BadRequestException("Patient profile already exists for this user");
            }
            const patient = this.patientRepository.create(dto);
            return this.patientRepository.save(patient);
        }
        catch (error) {
            this.logger.error(`Error creating patient: ${error.message}`);
            throw error;
        }
    }
    async getPatientById(id) {
        const patient = await this.patientRepository.findOne({ where: { id } });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient ${id} not found`);
        }
        return patient;
    }
    async getPatientByUserId(userId) {
        const patient = await this.patientRepository.findOne({ where: { userId } });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient for user ${userId} not found`);
        }
        return patient;
    }
    async updatePatient(id, dto) {
        const patient = await this.getPatientById(id);
        Object.assign(patient, dto);
        return this.patientRepository.save(patient);
    }
    async deactivatePatient(id) {
        const patient = await this.getPatientById(id);
        patient.isDeceased = true;
        patient.deceasedAt = new Date();
        await this.patientRepository.save(patient);
        return { message: "Patient deactivated successfully" };
    }
};
PatientService = PatientService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.PatientEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=patient.service.js.map