"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalChartingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const clinical_charting_entity_1 = require("./entities/clinical-charting.entity");
const clinical_charting_service_1 = require("./services/clinical-charting.service");
const clinical_charting_controller_1 = require("./controllers/clinical-charting.controller");
let ClinicalChartingModule = class ClinicalChartingModule {
};
ClinicalChartingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([clinical_charting_entity_1.ClinicalChartingEntity])],
        controllers: [clinical_charting_controller_1.ClinicalChartingController],
        providers: [clinical_charting_service_1.ClinicalChartingService],
        exports: [clinical_charting_service_1.ClinicalChartingService],
    })
], ClinicalChartingModule);
exports.ClinicalChartingModule = ClinicalChartingModule;
//# sourceMappingURL=clinical-charting.module.js.map