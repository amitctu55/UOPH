import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("UserService");

  app.setGlobal(ValidationPipe, {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });

  app.setGlobal(ValidationPipe, {
    whitelist: true,
    transform: true,
  });

  const config = new DocumentBuilder()
    .setTitle("User Service API")
    .setDescription("User management and profile service")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = process.env.PORT || 4002;
  await app.listen(port);
  logger.log(`User Service running on port ${port}`);
}

bootstrap();
