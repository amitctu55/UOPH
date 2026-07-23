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
var SearchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hospital_entity_1 = require("../../../hospital/src/hospital/entities/hospital.entity");
const doctor_entity_1 = require("../../../doctor/src/doctor/entities/doctor.entity");
let SearchService = SearchService_1 = class SearchService {
    constructor(hospitalRepo, doctorRepo) {
        this.hospitalRepo = hospitalRepo;
        this.doctorRepo = doctorRepo;
        this.logger = new common_1.Logger(SearchService_1.name);
    }
    async searchHospitals(query) {
        const searchTerm = `%${query}%`;
        return this.hospitalRepo.find({
            where: [{ name: (0, typeorm_2.ILike)(searchTerm) }, { city: (0, typeorm_2.ILike)(searchTerm) }, { bio: (0, typeorm_2.ILike)(searchTerm) }],
            take: 20,
        });
    }
    async searchDoctors(query) {
        const searchTerm = `%${query}%`;
        return this.doctorRepo.find({
            where: [
                { firstName: (0, typeorm_2.ILike)(searchTerm) },
                { lastName: (0, typeorm_2.ILike)(searchTerm) },
                { specialization: (0, typeorm_2.ILike)(searchTerm) },
                { bio: (0, typeorm_2.ILike)(searchTerm) },
            ],
            take: 20,
        });
    }
    async searchAll(query) {
        return {
            hospitals: await this.searchHospitals(query),
            doctors: await this.searchDoctors(query),
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = SearchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hospital_entity_1.HospitalEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(doctor_entity_1.DoctorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map