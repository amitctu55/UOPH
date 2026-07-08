import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

class UserServiceMock {}

describe("UserController", () => {
  let controller: UserController;
  let service: UserServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    // service = module.get<UserServiceMock>(UserServiceMock);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});