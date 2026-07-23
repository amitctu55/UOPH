"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
class UserServiceMock {
}
describe("UserController", () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [user_controller_1.UserController],
            providers: [
                {
                    provide: user_service_1.UserService,
                    useClass: UserServiceMock,
                },
            ],
        }).compile();
        controller = module.get(user_controller_1.UserController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=user.controller.spec.js.map