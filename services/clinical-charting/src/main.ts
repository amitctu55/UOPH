import { NestFactory } from "@nestjs/core";
import { ClinicalChartingModule } from "./clinical-charting.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(ClinicalChartingModule);
  const port = process.env.PORT || 3000;

  // Enable validation pipe for automatic DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Clinical Charting API")
    .setDescription("API for managing clinical charting data in MedSphere EHR")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
  console.log(`Clinical Charting Service running on port ${port}`);
}
bootstrap();