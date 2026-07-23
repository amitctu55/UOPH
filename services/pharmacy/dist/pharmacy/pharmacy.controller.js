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
exports.PharmacyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pharmacy_service_1 = require("./pharmacy.service");
const create_medicine_dto_1 = require("./dto/create-medicine.dto");
const update_medicine_dto_1 = require("./dto/update-medicine.dto");
let PharmacyController = class PharmacyController {
    constructor(pharmacyService) {
        this.pharmacyService = pharmacyService;
    }
    async createMedicine(dto) {
        return this.pharmacyService.createMedicine(dto);
    }
    async getMedicine(id) {
        return this.pharmacyService.getMedicine(id);
    }
    async getMedicines(search, requiresPrescription) {
        return this.pharmacyService.getMedicines(search, requiresPrescription === "true" ? true : requiresPrescription === "false" ? false : undefined);
    }
    async updateMedicine(id, dto) {
        return this.pharmacyService.updateMedicine(id, dto);
    }
    async deleteMedicine(id) {
        await this.pharmacyService.deleteMedicine(id);
        return { message: `Medicine ${id} deleted successfully` };
    }
};
exports.PharmacyController = PharmacyController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: "Create a new medicine" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Medicine created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Medicine already exists" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medicine_dto_1.CreateMedicineDto]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "createMedicine", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get medicine details" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Medicine details" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Medicine not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "getMedicine", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get list of medicines" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of medicines" }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, description: "Search by name" }),
    (0, swagger_1.ApiQuery)({
        name: "requiresPrescription",
        required: false,
        description: "Filter by prescription requirement",
    }),
    __param(0, (0, common_1.Query)("search")),
    __param(1, (0, common_1.Query)("requiresPrescription")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "getMedicines", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update medicine" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Medicine updated" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Medicine not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medicine_dto_1.UpdateMedicineDto]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "updateMedicine", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete medicine" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Medicine deleted" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Medicine not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "deleteMedicine", null);
exports.PharmacyController = PharmacyController = __decorate([
    (0, swagger_1.ApiTags)("Medicines"),
    (0, common_1.Controller)("medicines"),
    __metadata("design:paramtypes", [pharmacy_service_1.PharmacyService])
], PharmacyController);
//# sourceMappingURL=pharmacy.controller.js.map