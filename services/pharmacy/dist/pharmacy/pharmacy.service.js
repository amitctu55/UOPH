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
var PharmacyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const medicine_entity_1 = require("./entities/medicine.entity");
let PharmacyService = PharmacyService_1 = class PharmacyService {
    constructor(medicineRepository) {
        this.medicineRepository = medicineRepository;
        this.logger = new common_1.Logger(PharmacyService_1.name);
    }
    async createMedicine(dto) {
        this.logger.log(`Creating medicine: ${dto.name}`);
        const existing = await this.medicineRepository.findOne({
            where: { name: dto.name },
        });
        if (existing) {
            throw new Error("Medicine with this name already exists");
        }
        const medicine = this.medicineRepository.create(dto);
        return this.medicineRepository.save(medicine);
    }
    async getMedicine(id) {
        const medicine = await this.medicineRepository.findOne({
            where: { id },
        });
        if (!medicine) {
            throw new common_1.NotFoundException(`Medicine ${id} not found`);
        }
        return medicine;
    }
    async getMedicines(search, requiresPrescription) {
        const filters = {};
        if (requiresPrescription !== undefined) {
            filters.requiresPrescription = requiresPrescription;
        }
        if (search) {
            return this.medicineRepository.find({
                where: [
                    Object.assign({ name: `%${search}%` }, filters),
                    Object.assign({ genericName: `%${search}%` }, filters),
                ],
                order: { name: "ASC" },
            });
        }
        return this.medicineRepository.find({
            where: filters,
            order: { name: "ASC" },
        });
    }
    async updateMedicine(id, dto) {
        const medicine = await this.getMedicine(id);
        this.medicineRepository.merge(medicine, dto);
        return this.medicineRepository.save(medicine);
    }
    async deleteMedicine(id) {
        const medicine = await this.getMedicine(id);
        await this.medicineRepository.remove(medicine);
    }
};
exports.PharmacyService = PharmacyService;
exports.PharmacyService = PharmacyService = PharmacyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medicine_entity_1.MedicineEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PharmacyService);
//# sourceMappingURL=pharmacy.service.js.map