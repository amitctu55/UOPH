import { Injectable, Logger, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DoctorEntity, DoctorSpecialization, AvailabilityStatus } from "./entities/doctor.entity";
import { CreateDoctorDto, UpdateDoctorDto, DoctorSearchDto } from "./dto/doctor.dto";

@Injectable()
export class DoctorService {
  private readonly logger = new Logger(DoctorService.name);

  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>
  ) {}

  async createDoctorProfile(dto: CreateDoctorDto): Promise<DoctorEntity> {
    try {
      // Check if doctor already exists
      const existing = await this.doctorRepository.findOne({
        where: { userId: dto.userId },
      });

      if (existing) {
        throw new ConflictException("Doctor profile already exists for this user");
      }

      const doctor = this.doctorRepository.create(dto);
      return await this.doctorRepository.save(doctor);
    } catch (error) {
      this.logger.error(`Error creating doctor profile: ${error.message}`);
      throw error;
    }
  }

  async getDoctorProfile(doctorId: string): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId, isActive: true },
    });

    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    return doctor;
  }

  async getDoctorByUserId(userId: string): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({
      where: { userId, isActive: true },
    });

    if (!doctor) {
      throw new NotFoundException("Doctor profile not found");
    }

    return doctor;
  }

  async updateDoctorProfile(doctorId: string, dto: UpdateDoctorDto): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    Object.assign(doctor, dto);
    return await this.doctorRepository.save(doctor);
  }

  async searchDoctors(criteria: DoctorSearchDto, limit: number = 20): Promise<DoctorEntity[]> {
    let query = this.doctorRepository.createQueryBuilder("doctor").where("doctor.isActive = true");

    if (criteria.specialization) {
      query = query.andWhere("doctor.specialization = :specialization", {
        specialization: criteria.specialization,
      });
    }

    if (criteria.hospitalId) {
      query = query.andWhere("doctor.hospitalId = :hospitalId", {
        hospitalId: criteria.hospitalId,
      });
    }

    if (criteria.minRating) {
      query = query.andWhere("doctor.averageRating >= :minRating", {
        minRating: criteria.minRating,
      });
    }

    if (criteria.maxFee) {
      query = query.andWhere("doctor.consultationFee <= :maxFee", {
        maxFee: criteria.maxFee,
      });
    }

    return query.orderBy("doctor.averageRating", "DESC").take(limit).getMany();
  }

  async getDoctorsBySpecialization(specialization: DoctorSpecialization): Promise<DoctorEntity[]> {
    return this.doctorRepository.find({
      where: { specialization, isActive: true },
      order: { averageRating: "DESC" },
    });
  }

  async getDoctorsByHospital(hospitalId: string): Promise<DoctorEntity[]> {
    return this.doctorRepository.find({
      where: { hospitalId, isActive: true },
    });
  }

  async setAvailability(doctorId: string, status: AvailabilityStatus): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    doctor.availabilityStatus = status;
    return await this.doctorRepository.save(doctor);
  }

  async addRating(doctorId: string, rating: number): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    const totalRating = doctor.averageRating * doctor.totalRatings + rating;
    doctor.totalRatings += 1;
    doctor.averageRating = Number((totalRating / doctor.totalRatings).toFixed(2));

    return await this.doctorRepository.save(doctor);
  }

  async incrementConsultationCount(doctorId: string): Promise<void> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });

    if (doctor) {
      doctor.consultationCount += 1;
      await this.doctorRepository.save(doctor);
    }
  }

  async verifyDoctor(doctorId: string): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    doctor.isVerified = true;
    return await this.doctorRepository.save(doctor);
  }

  async deactivateDoctor(doctorId: string): Promise<{ message: string }> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    doctor.isActive = false;
    await this.doctorRepository.save(doctor);
    return { message: "Doctor deactivated" };
  }
}
