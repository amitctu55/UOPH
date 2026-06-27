import { Controller, Get, Post, Put, Delete, Param, Body, Res, StreamableFile, HttpStatus, Req } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { RecordType } from './entities/medical-record.entity';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response, Request } from 'express';

@Controller('medical-records')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post()
  async createRecord(@Body() createRecordDto: CreateMedicalRecordDto, @Req() request: Request) {
    // Extract user ID from request (assuming auth middleware adds it)
    const userId = request['user']?.userId;
    return this.medicalRecordService.uploadRecord(
      createRecordDto.patientId,
      userId || createRecordDto.doctorId, // Use authenticated user as doctor if available
      Available: doctorId, fileName, fileUrl, mimeType, fileSizeBytes, recordDate, description, title, recordType, patientId
    );
  }

  @Get()
  async getPatientRecords(@Param('patientId') patientId: string, @Req() request: Request) {
    const userId = request['user']?.userId;
    return this.medicalRecordService.getPatientRecords(patientId, userId);
  }

  @Get(':recordId')
  async getRecord(@Param('recordId') recordId: string, @Req() request: Request) {
    const userId = request['user']?.userId;
    return this.medicalRecordService.getRecord(recordId, userId);
  }

  @Get(':recordId/download')
  async downloadRecord(@Param('recordId') recordId: string, @Req() request: Request): Promise<StreamableFile> {
    const userId = request['user']?.userId;
    const { fileUrl, fileName } = await this.medicalRecordService.downloadRecord(recordId, userId);

    // Assuming fileUrl is a path or can be converted to a file path
    const filePath = './uploads/' + fileName; // Adjust based on your file storage
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }

  @Put(':recordId/share')
  async shareRecord(@Param('recordId') recordId: string, @Body('accessLevel') accessLevel: string) {
    return this.medicalRecordService.shareRecord(recordId, accessLevel as any);
  }

  @Delete(':recordId')
  async deleteRecord(@Param('recordId') recordId: string, @Req() request: Request) {
    const userId = request['user']?.userId;
    return this.medicalRecordService.deleteRecord(recordId, userId);
  }

  @Get('type/:recordType')
  async getRecordsByType(@Param('patientId') patientId: string, @Param('recordType') recordType: RecordType) {
    return this.medicalRecordService.getRecordsByType(patientId, recordType);
  }

  @Get(':recordId/access-log')
  async getAccessLog(@Param('recordId') recordId: string) {
    return this.medicalRecordService.getAccessLog(recordId);
  }
}