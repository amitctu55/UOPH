import { Test, TestingModule } from "@nestjs/testing";
import { PharmacyController } from "./pharmacy.controller";
import { PharmacyService } from "./pharmacy.service";

describe("PharmacyController", () => {
  let controller: PharmacyController;
  const mockPharmacyService = {
    // add methods as needed
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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyController],
      providers: [
        {
          provide: PharmacyService,
          useValue: mockPharmacyService,
        },
      ],
    }).compile();

    controller = module.get<PharmacyController>(PharmacyController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});