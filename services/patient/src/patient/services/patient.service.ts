import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PatientEntity } from "../entities/patient.entity";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { UpdatePatientDto } from "../dto/update-patient.dto";

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);

  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  /**
   * Create a new patient profile
   */
  async createPatient(dto: CreatePatientDto): Promise<PatientEntity> {
    try {
      // Check if patient already exists for this user
      const existingPatient = await this.patientRepository.findOne({
        where: { userId: dto.userId },
      });

      if (existingPatient) {
        throw new BadRequestException("Patient profile already exists for this user");
      }

      const patient = this.patientRepository.create(dto);
      return this.patientRepository.save(patient);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating patient: ${message}`);
      throw error;
    }
  }

  /**
   * Get patient by ID
   */
  async getPatientById(id: string): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient ${id} not found`);
    }
    return patient;
  }

  /**
   * Get patient by user ID
   */
  async getPatientByUserId(userId: string): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOne({ where: { userId } });
    if (!patient) {
      throw new NotFoundException(`Patient for user ${userId} not found`);
    }
    return patient;
  }

  /**
   * Update patient information
   */
  async updatePatient(id: string, dto: UpdatePatientDto): Promise<PatientEntity> {
    const patient = await this.getPatientById(id);

    // Update only the fields that are present in the DTO
    Object.assign(patient, dto);

    return this.patientRepository.save(patient);
  }

  /**
   * Deactivate patient (soft delete by marking as deceased)
   */
  async deactivatePatient(id: string): Promise<{ message: string }> {
    const patient = await this.getPatientById(id);
    patient.isDeceased = true;
    patient.deceasedAt = new Date();
    await this.patientRepository.save(patient);
    return { message: "Patient deactivated successfully" };
  }
}