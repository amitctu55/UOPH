"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger("UserService");
    app.setGlobal(common_1.ValidationPipe, {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    });
    app.setGlobal(common_1.ValidationPipe, {
        whitelist: true,
        transform: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("User Service API")
        .setDescription("User management and profile service")
        .setVersion("1.0.0")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/docs", app, document);
    const port = process.env.PORT || 4002;
    await app.listen(port);
    logger.log(`User Service running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map