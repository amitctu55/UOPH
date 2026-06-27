import { Module } from "@nestjs/common";
import { MedicalRecordModule } from "./records/medical-record.module";

@Module({
  imports: [MedicalRecordModule],
})
export class AppModule {}
