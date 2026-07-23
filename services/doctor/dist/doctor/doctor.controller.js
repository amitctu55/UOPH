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
var DoctorController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doctor_service_1 = require("./doctor.service");
const doctor_dto_1 = require("./dto/doctor.dto");
const doctor_entity_1 = require("./entities/doctor.entity");
let DoctorController = DoctorController_1 = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
        this.logger = new common_1.Logger(DoctorController_1.name);
    }
    async createDoctorProfile(dto) {
        this.logger.log(`Creating doctor profile for user: ${dto.userId}`);
        return this.doctorService.createDoctorProfile(dto);
    }
    async searchDoctors(criteria) {
        this.logger.log("Searching doctors with criteria:", criteria);
        return this.doctorService.searchDoctors(criteria);
    }
    async getDoctorProfile(doctorId) {
        this.logger.log(`Getting doctor profile: ${doctorId}`);
        return this.doctorService.getDoctorProfile(doctorId);
    }
    async getDoctorByUserId(userId) {
        this.logger.log(`Getting doctor profile by user ID: ${userId}`);
        return this.doctorService.getDoctorByUserId(userId);
    }
    async updateDoctorProfile(doctorId, dto) {
        this.logger.log(`Updating doctor profile: ${doctorId}`);
        return this.doctorService.updateDoctorProfile(doctorId, dto);
    }
    async setAvailability(doctorId, status) {
        this.logger.log(`Setting availability for doctor: ${doctorId}`);
        return this.doctorService.setAvailability(doctorId, status);
    }
    async addRating(doctorId, rating) {
        this.logger.log(`Adding rating to doctor: ${doctorId}`);
        return this.doctorService.addRating(doctorId, rating);
    }
    async verifyDoctor(doctorId) {
        this.logger.log(`Verifying doctor: ${doctorId}`);
        return this.doctorService.verifyDoctor(doctorId);
    }
    async deactivateDoctor(doctorId) {
        this.logger.log(`Deactivating doctor: ${doctorId}`);
        return this.doctorService.deactivateDoctor(doctorId);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Post)("profile"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: "Create doctor profile" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Doctor profile created" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "createDoctorProfile", null);
__decorate([
    (0, common_1.Get)("search"),
    (0, swagger_1.ApiOperation)({ summary: "Search doctors by criteria" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Search results" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.DoctorSearchDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "searchDoctors", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get doctor profile" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Doctor profile" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorProfile", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    (0, swagger_1.ApiOperation)({ summary: "Get doctor by user ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Doctor profile" }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorByUserId", null);
__decorate([
    (0, common_1.Put)(":id/profile"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Update doctor profile" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Profile updated" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "updateDoctorProfile", null);
__decorate([
    (0, common_1.Put)(":id/availability"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Set doctor availability" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Availability updated" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "setAvailability", null);
__decorate([
    (0, common_1.Post)(":id/rating"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Add rating to doctor" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Rating added" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("rating")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "addRating", null);
__decorate([
    (0, common_1.Post)(":id/verify"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Verify doctor" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Doctor verified" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "verifyDoctor", null);
__decorate([
    (0, common_1.Post)(":id/deactivate"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "Deactivate doctor" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Doctor deactivated" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "deactivateDoctor", null);
exports.DoctorController = DoctorController = DoctorController_1 = __decorate([
    (0, swagger_1.ApiTags)("Doctors"),
    (0, common_1.Controller)("doctors"),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map