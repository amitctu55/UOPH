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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMedicineDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMedicineDto {
    constructor() {
        this.requiresPrescription = false;
        this.stockQuantity = 0;
        this.reorderLevel = 50;
    }
}
exports.CreateMedicineDto = CreateMedicineDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Medicine name" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Generic name", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "genericName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Strength (e.g., 500mg)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "strength", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Form (tablet, capsule, syrup, injection)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "form", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Manufacturer", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "HSN code", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "hsnCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Price per unit", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateMedicineDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Whether prescription is required", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMedicineDto.prototype, "requiresPrescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Stock quantity", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMedicineDto.prototype, "stockQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Reorder level", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMedicineDto.prototype, "reorderLevel", void 0);
//# sourceMappingURL=create-medicine.dto.js.map