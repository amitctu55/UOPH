import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { stopMemoryMongo } from "./database/mongo.bootstrap";

async function bootstrap() {
  const logger = new Logger("AuthService");
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });

  const origins = (process.env.CORS_ORIGINS || "http://localhost:3000,http://localhost:3001")
    .split(",")
    .map(o => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  app.setGlobalPrefix("auth");

  const swagger = new DocumentBuilder()
    .setTitle("UPCHAR Auth Service")
    .setDescription("Authentication, registration, and JWT session APIs")
    .setVersion("0.1.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("auth/docs", app, SwaggerModule.createDocument(app, swagger));

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  logger.log(`UPCHAR auth listening on http://localhost:${port}/auth`);
  logger.log(`Swagger docs at http://localhost:${port}/auth/docs`);

  const shutdown = async () => {
    await app.close();
    await stopMemoryMongo();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap();
