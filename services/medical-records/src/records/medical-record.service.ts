import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicalRecordEntity, RecordType, AccessLevel } from "./entities/medical-record.entity";

@Injectable()
export class MedicalRecordService {
  private readonly logger = new Logger(MedicalRecordService.name);

  constructor(
    @InjectRepository(MedicalRecordEntity)
    private readonly recordRepository: Repository<MedicalRecordEntity>
  ) {}

  async uploadRecord(
    patientId: string,
    doctorId: string,
    recordType: RecordType,
    title: string,
    fileUrl: string,
    fileName: string
  ): Promise<MedicalRecordEntity> {
    try {
      const record = this.recordRepository.create({
        patientId,
        doctorId,
        recordType,
        title,
        fileUrl,
        fileName,
        isEncrypted: true,
      });

      const saved = await this.recordRepository.save(record);

      // Log access
      this.logAccess(saved.id, doctorId, "UPLOAD", "Doctor uploaded record");

      return saved;
    } catch (error) {
      this.logger.error(`Error uploading record: ${error.message}`);
      throw error;
    }
  }

  async getPatientRecords(
    patientId: string,
    requestingUserId: string
  ): Promise<MedicalRecordEntity[]> {
    const records = await this.recordRepository.find({
      where: { patientId, deletedAt: null },
      order: { recordDate: "DESC" },
    });

    // Filter based on access level
    return records.filter(record => {
      if (record.patientId === requestingUserId) return true;
      if (record.accessLevel === AccessLevel.SHARED) return true;
      if (record.doctorId === requestingUserId && record.accessLevel === AccessLevel.DOCTOR_ONLY)
        {return true;}
      return false;
    });
  }

  async getRecord(recordId: string, requestingUserId: string): Promise<MedicalRecordEntity> {
    const record = await this.recordRepository.findOne({
      where: { id: recordId, deletedAt: null },
    });

    if (!record) {
      throw new NotFoundException("Medical record not found");
    }

    // Check access permissions
    if (
      record.patientId !== requestingUserId &&
      record.doctorId !== requestingUserId &&
      record.accessLevel !== AccessLevel.SHARED
    ) {
      throw new ForbiddenException("Access denied to this record");
    }

    // Log access
    this.logAccess(recordId, requestingUserId, "VIEW", "Record viewed");

    return record;
  }

  async downloadRecord(
    recordId: string,
    requestingUserId: string
  ): Promise<{ fileUrl: string; fileName: string }> {
    const record = await this.getRecord(recordId, requestingUserId);

    // Log access
    this.logAccess(recordId, requestingUserId, "DOWNLOAD", "Record downloaded");

    return {
      fileUrl: record.fileUrl,
      fileName: record.fileName,
    };
  }

  async shareRecord(recordId: string, accessLevel: AccessLevel): Promise<MedicalRecordEntity> {
    const record = await this.recordRepository.findOne({
      where: { id: recordId },
    });

    if (!record) {
      throw new NotFoundException("Medical record not found");
    }

    record.accessLevel = accessLevel;
    this.logAccess(recordId, "SYSTEM", "SHARE", `Shared with access level: ${accessLevel}`);

    return await this.recordRepository.save(record);
  }

  async deleteRecord(recordId: string, requestingUserId: string): Promise<{ message: string }> {
    const record = await this.recordRepository.findOne({
      where: { id: recordId },
    });

    if (!record) {
      throw new NotFoundException("Medical record not found");
    }

    if (record.patientId !== requestingUserId && record.doctorId !== requestingUserId) {
      throw new ForbiddenException("Cannot delete this record");
    }

    record.deletedAt = new Date();
    this.logAccess(recordId, requestingUserId, "DELETE", "Record deleted");

    await this.recordRepository.save(record);
    return { message: "Record deleted successfully" };
  }

  async getRecordsByType(
    patientId: string,
    recordType: RecordType
  ): Promise<MedicalRecordEntity[]> {
    return this.recordRepository.find({
      where: { patientId, recordType, deletedAt: null },
      order: { recordDate: "DESC" },
    });
  }

  async getAccessLog(recordId: string): Promise<any[]> {
    const record = await this.recordRepository.findOne({
      where: { id: recordId },
    });

    if (!record) {
      throw new NotFoundException("Medical record not found");
    }

    return record.accessLog || [];
  }

  private logAccess(recordId: string, userId: string, action: string, details: string): void {
    this.logger.log(
      `[ACCESS LOG] Record: ${recordId}, User: ${userId}, Action: ${action}, Details: ${details}`
    );
  }
}
