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
var DoctorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_entity_1 = require("./entities/doctor.entity");
let DoctorService = DoctorService_1 = class DoctorService {
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
        this.logger = new common_1.Logger(DoctorService_1.name);
    }
    async createDoctorProfile(dto) {
        try {
            const existing = await this.doctorRepository.findOne({
                where: { userId: dto.userId },
            });
            if (existing) {
                throw new common_1.ConflictException("Doctor profile already exists for this user");
            }
            const doctor = this.doctorRepository.create(dto);
            return await this.doctorRepository.save(doctor);
        }
        catch (error) {
            this.logger.error(`Error creating doctor profile: ${error.message}`);
            throw error;
        }
    }
    async getDoctorProfile(doctorId) {
        const doctor = await this.doctorRepository.findOne({
            where: { id: doctorId, isActive: true },
        });
        if (!doctor) {
            throw new common_1.NotFoundException("Doctor not found");
        }
        return doctor;
    }
    async getDoctorByUserId(userId) {
        const doctor = await this.doctorRepository.findOne({
            where: { userId, isActive: true },
        });
        if (!doctor) {
            throw new common_1.NotFoundException("Doctor profile not found");
        }
        return doctor;
    }
    async updateDoctorProfile(doctorId, dto) {
        const doctor = await this.doctorRepository.findOne({
            where: { id: doctorId },
        });
        if (!doctor) {
            throw new common_1.NotFoundException("Doctor not found");
        }
        Object.assign(doctor, dto);
        return await this.doctorRepository.save(doctor);
    }
    async searchDoctors(criteria, limit = 20) {
        let query = this.doctorRepository.createQueryBuilder("doctor").where("doctor.isActive = true");
        if (criteria.specialization) {
            query = query.andWhere("doctor.specialization = :specialization", {
                specialization: criteria.specialization,
            });
        }
        if (criteria.hospitalId) {
            query = query.andWhere("doctor.hospitalId = :hospitalId", {
                hospitalId: criteria.hospitalId,
            });
        }
        if (criteria.minRating) {
            query = query.andWhere("doctor.averageRating >= :minRating", {
                minRating: criteria.minRating,
            });
        }
        if (criteria.maxFee) {
            query = query.andWhere("doctor.consultationFee <= :maxFee", {
                maxFee: criteria.maxFee,
            });
        }
        return query.orderBy("doctor.averageRating", "DESC").take(limit).getMany();
    }
    async getDoctorsBySpecialization(specialization) {
        return this.doctorRepository.find({
            where: { specialization, isActive: true },
            order: { averageRating: "DESC" },
        });
    }
    async getDoctorsByHospital(hospitalId) {
        return this.doctorRepository.find({
            where: { hospitalId, isActive: true },
        });
    }
    async setAvailability(doctorId, status) {
        const doctor = await this.doctorRepository.findOne({
            where: { id: doctorId },
        });
        if (!doctor) {
            throw new common_1.NotFoundException("Doctor not found");
        }
        doctor.availabilityStatus = status;
        return await this.doctorRepository.save(doctor);
    }
    async addRating(doctorId, rating) {
        const doctor = await this.doctorRepository.findOne({
            where: { id: doctorId },
        });
        if (!doctor) {
            throw new common_1.NotFoundException("Doctor not found");
        }
        const totalRating = doctor.averageRating * doctor.totalRatings + rating;
        doctor.totalRatings += 1;
        doctor.averageRating = Number((totalRating / doctor.totalRatings).toFixed(2));
        return await this.doctorRepository.save(doctor);
    }
    async incrementConsultationCount(doctorId) {
        const doctor = await this.doctorRepository.findOne({
            where: { id: doctorId },
        });
        if (doctor) {
            doctor.consultationCount += 1;
            await this.doctorRepository.save(doctor);
        }
    }
    async verifyDoctor(doctorId) {
        const doctor = await this.doctorRepository.findOne({
            where: { id: doctorId },
        });
        if (!doctor) {
            throw new common_1.NotFoundException("Doctor not found");
        }
        doctor.isVerified = true;
        return await this.doctorRepository.save(doctor);
    }
    async deactivateDoctor(doctorId) {
        const doctor = await this.doctorRepository.findOne({
            where: { id: doctorId },
        });
        if (!doctor) {
            throw new common_1.NotFoundException("Doctor not found");
        }
        doctor.isActive = false;
        await this.doctorRepository.save(doctor);
        return { message: "Doctor deactivated" };
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = DoctorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.DoctorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map