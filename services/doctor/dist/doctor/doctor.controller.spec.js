"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const doctor_controller_1 = require("./doctor.controller");
const doctor_service_1 = require("./doctor.service");
class DoctorServiceMock {
    constructor() {
        this.createDoctorProfile = jest.fn();
        this.getDoctorProfile = jest.fn();
        this.getDoctorByUserId = jest.fn();
        this.updateDoctorProfile = jest.fn();
        this.searchDoctors = jest.fn();
        this.getDoctorsBySpecialization = jest.fn();
        this.getDoctorsByHospital = jest.fn();
        this.setAvailability = jest.fn();
        this.addRating = jest.fn();
        this.incrementConsultationCount = jest.fn();
        this.verifyDoctor = jest.fn();
        this.deactivateDoctor = jest.fn();
    }
}
describe("DoctorController", () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [doctor_controller_1.DoctorController],
            providers: [
                {
                    provide: doctor_service_1.DoctorService,
                    useClass: DoctorServiceMock,
                },
            ],
        }).compile();
        controller = module.get(doctor_controller_1.DoctorController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=doctor.controller.spec.js.map