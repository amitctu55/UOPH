"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const telemedicine_controller_1 = require("./telemedicine.controller");
const telemedicine_service_1 = require("./telemedicine.service");
class TelemedicineServiceMock {
}
describe("TelemedicineController", () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [telemedicine_controller_1.TelemedicineController],
            providers: [
                {
                    provide: telemedicine_service_1.TelemedicineService,
                    useClass: TelemedicineServiceMock,
                },
            ],
        }).compile();
        controller = module.get(telemedicine_controller_1.TelemedicineController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=telemedicine.controller.spec.js.map