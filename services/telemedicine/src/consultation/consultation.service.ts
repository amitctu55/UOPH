import { Injectable, Logger, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConsultationEntity, ConsultationStatus } from "./entities/consultation.entity";
import {
  CreateConsultationDto,
  UpdateConsultationDto,
  StartConsultationDto,
  EndConsultationDto,
} from "./dto/consultation.dto";

@Injectable()
export class ConsultationService {
  private readonly logger = new Logger(ConsultationService.name);

  constructor(
    @InjectRepository(ConsultationEntity)
    private readonly consultationRepository: Repository<ConsultationEntity>
  ) {}

  async createConsultation(dto: CreateConsultationDto): Promise<ConsultationEntity> {
    try {
      const consultation = this.consultationRepository.create(dto);
      return await this.consultationRepository.save(consultation);
    } catch (error) {
      this.logger.error(`Error creating consultation: ${error.message}`);
      throw error;
    }
  }

  async getConsultation(consultationId: string): Promise<ConsultationEntity> {
    const consultation = await this.consultationRepository.findOne({
      where: { id: consultationId },
    });

    if (!consultation) {
      throw new NotFoundException("Consultation not found");
    }

    return consultation;
  }

  async getPatientConsultations(patientId: string): Promise<ConsultationEntity[]> {
    return this.consultationRepository.find({
      where: { patientId },
      order: { scheduledAt: "DESC" },
    });
  }

  async getDoctorConsultations(doctorId: string): Promise<ConsultationEntity[]> {
    return this.consultationRepository.find({
      where: { doctorId },
      order: { scheduledAt: "DESC" },
    });
  }

  async startConsultation(
    consultationId: string,
    dto: StartConsultationDto
  ): Promise<ConsultationEntity> {
    const consultation = await this.consultationRepository.findOne({
      where: { id: consultationId },
    });

    if (!consultation) {
      throw new NotFoundException("Consultation not found");
    }

    if (consultation.status !== ConsultationStatus.SCHEDULED) {
      throw new BadRequestException("Consultation cannot be started");
    }

    consultation.status = ConsultationStatus.IN_PROGRESS;
    consultation.startedAt = new Date();
    consultation.meetingUrl = dto.meetingUrl;
    consultation.isRecorded = dto.recordSession || false;

    return await this.consultationRepository.save(consultation);
  }

  async endConsultation(
    consultationId: string,
    dto: EndConsultationDto
  ): Promise<ConsultationEntity> {
    const consultation = await this.consultationRepository.findOne({
      where: { id: consultationId },
    });

    if (!consultation) {
      throw new NotFoundException("Consultation not found");
    }

    if (consultation.status !== ConsultationStatus.IN_PROGRESS) {
      throw new BadRequestException("Consultation is not in progress");
    }

    consultation.status = ConsultationStatus.COMPLETED;
    consultation.endedAt = new Date();
    consultation.notes = dto.notes;
    consultation.recordingUrl = dto.recordingUrl;
    consultation.vitals = dto.vitals;

    if (consultation.startedAt) {
      const durationMs = consultation.endedAt.getTime() - consultation.startedAt.getTime();
      consultation.durationMinutes = Math.round(durationMs / 60000);
    }

    return await this.consultationRepository.save(consultation);
  }

  async updateConsultation(
    consultationId: string,
    dto: UpdateConsultationDto
  ): Promise<ConsultationEntity> {
    const consultation = await this.consultationRepository.findOne({
      where: { id: consultationId },
    });

    if (!consultation) {
      throw new NotFoundException("Consultation not found");
    }

    Object.assign(consultation, dto);
    return await this.consultationRepository.save(consultation);
  }

  async cancelConsultation(consultationId: string): Promise<{ message: string }> {
    const consultation = await this.consultationRepository.findOne({
      where: { id: consultationId },
    });

    if (!consultation) {
      throw new NotFoundException("Consultation not found");
    }

    if (consultation.status !== ConsultationStatus.SCHEDULED) {
      throw new BadRequestException("Only scheduled consultations can be cancelled");
    }

    consultation.status = ConsultationStatus.CANCELLED;
    await this.consultationRepository.save(consultation);

    return { message: "Consultation cancelled" };
  }

  async getUpcomingConsultations(
    doctorId: string,
    days: number = 7
  ): Promise<ConsultationEntity[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    return this.consultationRepository.find({
      where: {
        doctorId,
        status: ConsultationStatus.SCHEDULED,
      },
      order: { scheduledAt: "ASC" },
    });
  }

  async markNoShow(consultationId: string): Promise<{ message: string }> {
    const consultation = await this.consultationRepository.findOne({
      where: { id: consultationId },
    });

    if (!consultation) {
      throw new NotFoundException("Consultation not found");
    }

    consultation.status = ConsultationStatus.NO_SHOW;
    await this.consultationRepository.save(consultation);

    return { message: "Consultation marked as no-show" };
  }
}
