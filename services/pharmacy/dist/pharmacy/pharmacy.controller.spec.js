"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const pharmacy_controller_1 = require("./pharmacy.controller");
const pharmacy_service_1 = require("./pharmacy.service");
describe("PharmacyController", () => {
    let controller;
    const mockPharmacyService = {
        createPharmacyProfile: jest.fn(),
        getPharmacyProfile: jest.fn(),
        getPharmacyByUserId: jest.fn(),
        updatePharmacyProfile: jest.fn(),
        searchPharmacies: jest.fn(),
        getPharmaciesBySpecialization: jest.fn(),
        getPharmaciesByLocation: jest.fn(),
        setAvailability: jest.fn(),
        addInventoryItem: jest.fn(),
        updateInventoryItem: jest.fn(),
        removeInventoryItem: jest.fn(),
        getInventory: jest.fn(),
        lowStockAlert: jest.fn(),
        recordSale: jest.fn(),
        getSalesReport: jest.fn(),
        processInsuranceClaim: jest.fn(),
        managePrescription: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [pharmacy_controller_1.PharmacyController],
            providers: [
                {
                    provide: pharmacy_service_1.PharmacyService,
                    useValue: mockPharmacyService,
                },
            ],
        }).compile();
        controller = module.get(pharmacy_controller_1.PharmacyController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=pharmacy.controller.spec.js.map