import { Test, TestingModule } from "@nestjs/testing";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";

class DoctorServiceMock {
  createDoctorProfile = jest.fn();
  getDoctorProfile = jest.fn();
  getDoctorByUserId = jest.fn();
  updateDoctorProfile = jest.fn();
  searchDoctors = jest.fn();
  getDoctorsBySpecialization = jest.fn();
  getDoctorsByHospital = jest.fn();
  setAvailability = jest.fn();
  addRating = jest.fn();
  incrementConsultationCount = jest.fn();
  verifyDoctor = jest.fn();
  deactivateDoctor = jest.fn();
}

describe("DoctorController", () => {
  let controller: DoctorController;
  let service: DoctorServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useClass: DoctorServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
    // service = module.get<DoctorServiceMock>(DoctorService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});