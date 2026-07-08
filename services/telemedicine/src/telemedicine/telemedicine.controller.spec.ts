import { Test, TestingModule } from "@nestjs/testing";
import { TelemedicineController } from "./telemedicine.controller";
import { TelemedicineService } from "./telemedicine.service";

class TelemedicineServiceMock {}

describe("TelemedicineController", () => {
  let controller: TelemedicineController;
  let service: TelemedicineServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelemedicineController],
      providers: [
        {
          provide: TelemedicineService,
          useClass: TelemedicineServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TelemedicineController>(TelemedicineController);
    // service = module.get<TelemedicineServiceMock>(TelemedicineServiceMock);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});