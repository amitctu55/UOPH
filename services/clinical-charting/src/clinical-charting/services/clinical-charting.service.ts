import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClinicalChartingEntity, ClinicalDataType } from "./entities/clinical-charting.entity";
import { CreateClinicalChartingDataDto } from "./dtos/create-clinical-charting.dto";
import { UpdateClinicalChartingDataDto } from "./dtos/update-clinical-charting.dto";

@Injectable()
export class ClinicalChartingService {
  private readonly logger = new Logger(ClinicalChartingService.name);

  constructor(
    @InjectRepository(ClinicalChartingEntity)
    private readonly clinicalChartingRepository: Repository<ClinicalChartingEntity>,
  ) {}

  async createClincalChartingData(
    dto: CreateClinicalChartingDataDto,
  ): Promise<ClinicalChartingEntity> {
    try {
      const clinicalData = this.clinicalChartingRepository.create({
        ...dto,
        recordedAt: dto.encounteredAt ?? new Date(),
        accessLog: [
          {
            userId: dto.providerId,
            accessedAt: new Date().toISOString(),
            action: "CREATE",
          },
        ],
      });

      const saved = await this.clinicalChartingRepository.save(clinicalData);

      // Log access
      this.logAccess(saved.id, dto.providerId, "CREATE", "Clinical data created");

      return saved;
    } catch (error) {
      this.logger.error(
        `Error creating clinical charting data: ${error.message}`,
      );
      throw error;
    }
  }

  async getClinicalDataById(
    id: string,
    requestingUserId: string,
  ): Promise<ClinicalChartingEntity> {
    const clinicalData = await this.clinicalChartingRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!clinicalData) {
      throw new NotFoundException("Clinical data not found");
    }

    // Check access permissions
    if (
      clinicalData.patientId !== requestingUserId &&
      clinicalData.providerId !== requestingUserId
    ) {
      // In a real system, you might check for care team membership or other permissions
      throw new ForbiddenException("Access denied to this clinical data");
    }

    // Log access
    this.logAccess(
      clinicalData.id,
      requestingUserId,
      "VIEW",
      "Clinical data viewed",
    );

    return clinicalData;
  }

  async getClinicalDataByPatientId(
    patientId: string,
    requestingUserId: string,
  ): Promise<ClinicalChartingEntity[]> {
    // Verify user has access to this patient's data
    // This would typically involve checking if the user is the patient,
    // a provider for the patient, or part of the care team
    // For now, we'll implement a basic check
    if (
      patientId !== requestingUserId
    ) {
      // In a real implementation, you'd check provider/patient relationship
      // For demo purposes, we'll allow access but log it
      this.logger.warn(
        `User ${requestingUserId} accessing clinical data for patient ${patientId}`,
      );
    }

    const clinicalData = await this.clinicalChartingRepository.find({
      where: { patientId, deletedAt: null },
      order: { recordedAt: "DESC" },
    });

    // Log access for each record
    clinicalData.forEach((data) => {
      this.logAccess(
        data.id,
        requestingUserId,
        "LIST_VIEW",
        "Clinical data list viewed",
      );
    });

    return clinicalData;
  }

  async getClinicalDataByType(
    patientId: string,
    clinicalDataType: ClinicalDataType,
    requestingUserId: string,
  ): Promise<ClinicalChartingEntity[]> {
    // Verify user has access (similar to above)
    if (
      patientId !== requestingUserId
    ) {
      this.logger.warn(
        `User ${requestingUserId} accessing ${clinicalDataType} data for patient ${patientId}`,
      );
    }

    const clinicalData = await this.clinicalChartingRepository.find({
      where: {
        patientId,
        clinicalDataType,
        deletedAt: null,
      },
      order: { recordedAt: "DESC" },
    });

    // Log access for each record
    clinicalData.forEach((data) => {
      this.logAccess(
        data.id,
        requestingUserId,
        "FILTERED_VIEW",
        `Clinical data filtered by type: ${clinicalDataType}`,
      );
    });

    return clinicalData;
  }

  async updateClinicalData(
    id: string,
    dto: UpdateClinicalChartingDataDto,
    requestingUserId: string,
  ): Promise<ClinicalChartingEntity> {
    const clinicalData = await this.clinicalChartingRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!clinicalData) {
      throw new NotFoundException("Clinical data not found");
    }

    // Check permissions - only the provider who created it or the patient can update
    // In a real system, you might allow care team members to update certain types
    if (
      clinicalData.providerId !== requestingUserId &&
      clinicalData.patientId !== requestingUserId
    ) {
      throw new ForbiddenException(
        "Access denied to update this clinical data",
      );
    }

    // Update only the fields that are present in the DTO
    Object.assign(clinicalData, dto);
    clinicalData.updatedAt = new Date();

    // Add to access log
    clinicalData.accessLog = [
      ...clinicalData.accessLog,
      {
        userId: requestingUserId,
        accessedAt: new Date().toISOString(),
        action: "UPDATE",
      },
    ];

    const updated = await this.clinicalChartingRepository.save(clinicalData);

    // Log access
    this.logAccess(
      updated.id,
      requestingUserId,
      "UPDATE",
      "Clinical data updated",
    );

    return updated;
  }

  async deactivateClinicalData(
    id: string,
    requestingUserId: string,
  ): Promise<{ message: string }> {
    const clinicalData = await this.clinicalChartingRepository.findOne({
      where: { id },
    });

    if (!clinicalData) {
      throw new NotFoundException("Clinical data not found");
    }

    // Check permissions - only the provider who created it or the patient can deactivate
    if (
      clinicalData.providerId !== requestingUserId &&
      clinicalData.patientId !== requestingUserId
    ) {
      throw new ForbiddenException(
        "Access denied to deactivate this clinical data",
      );
    }

    clinicalData.isActive = false;
    clinicalData.deletedAt = new Date();

    // Add to access log
    clinicalData.accessLog = [
      ...clinicalData.accessLog,
      {
        userId: requestingUserId,
        accessedAt: new Date().toISOString(),
        action: "DEACTIVATE",
      },
    ];

    await this.clinicalChartingRepository.save(clinicalData);

    // Log access
    this.logAccess(
      id,
      requestingUserId,
      "DEACTIVATE",
      "Clinical data deactivated",
    );

    return { message: "Clinical data deactivated successfully" };
  }

  private logAccess(
    clinicalDataId: string,
    userId: string,
    action: string,
    details: string,
  ): void {
    this.logger.log(
      `[ACCESS LOG] ClinicalData: ${clinicalDataId}, User: ${userId}, Action: ${action}, Details: ${details}`,
    );
    // In a production system, you would save this to a dedicated audit table
  }
}