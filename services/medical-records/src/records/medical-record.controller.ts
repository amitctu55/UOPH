import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  StreamableFile,
  Req,
} from "@nestjs/common";
import { MedicalRecordService } from "./medical-record.service";
import { CreateMedicalRecordDto } from "./dto/create-medical-record.dto";
import { RecordType } from "./entities/medical-record.entity";
import { createReadStream } from "fs";
import { Request } from "express";

@Controller("medical-records")
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post()
  async createRecord(@Body() createRecordDto: CreateMedicalRecordDto, @Req() request: Request) {
    const userId = (request as Request & { user?: { userId?: string } }).user?.userId;
    return this.medicalRecordService.uploadRecord(
      createRecordDto.patientId,
      userId || createRecordDto.doctorId,
      createRecordDto.recordType,
      createRecordDto.title,
      createRecordDto.fileUrl,
      createRecordDto.fileName
    );
  }

  @Get()
  async getPatientRecords(@Param("patientId") patientId: string, @Req() request: Request) {
    const userId = (request as Request & { user?: { userId?: string } }).user?.userId;
    return this.medicalRecordService.getPatientRecords(patientId, userId || "");
  }

  @Get(":recordId")
  async getRecord(@Param("recordId") recordId: string, @Req() request: Request) {
    const userId = (request as Request & { user?: { userId?: string } }).user?.userId;
    return this.medicalRecordService.getRecord(recordId, userId || "");
  }

  @Get(":recordId/download")
  async downloadRecord(
    @Param("recordId") recordId: string,
    @Req() request: Request
  ): Promise<StreamableFile> {
    const userId = (request as Request & { user?: { userId?: string } }).user?.userId;
    const { fileName } = await this.medicalRecordService.downloadRecord(recordId, userId || "");

    const filePath = "./uploads/" + fileName;
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }

  @Put(":recordId/share")
  async shareRecord(@Param("recordId") recordId: string, @Body("accessLevel") accessLevel: string) {
    return this.medicalRecordService.shareRecord(recordId, accessLevel as never);
  }

  @Delete(":recordId")
  async deleteRecord(@Param("recordId") recordId: string, @Req() request: Request) {
    const userId = (request as Request & { user?: { userId?: string } }).user?.userId;
    return this.medicalRecordService.deleteRecord(recordId, userId || "");
  }

  @Get("type/:recordType")
  async getRecordsByType(
    @Param("patientId") patientId: string,
    @Param("recordType") recordType: RecordType
  ) {
    return this.medicalRecordService.getRecordsByType(patientId, recordType);
  }

  @Get(":recordId/access-log")
  async getAccessLog(@Param("recordId") recordId: string) {
    return this.medicalRecordService.getAccessLog(recordId);
  }
}
