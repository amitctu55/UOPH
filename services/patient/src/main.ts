import { NestFactory } from "@nestjs/core";
import { PatientModule } from "./patient/patient.module";

async function bootstrap() {
  const app = await NestFactory.create(PatientModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Patient service running on port ${port}`);
}
bootstrap();