import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HospitalEntity } from "./entities/hospital.entity";
import { CreateHospitalDto } from "./dto/create-hospital.dto";

@Injectable()
export class HospitalService {
  private readonly logger = new Logger(HospitalService.name);

  constructor(
    @InjectRepository(HospitalEntity)
    private hospitalRepository: Repository<HospitalEntity>
  ) {}

  /**
   * Create a new hospital
   */
  async createHospital(dto: CreateHospitalDto): Promise<HospitalEntity> {
    this.logger.log(`Creating hospital: ${dto.name}`);

    // Check if hospital with same name already exists
    const existing = await this.hospitalRepository.findOne({
      where: { name: dto.name },
    });
    if (existing) {
      throw new Error("Hospital with this name already exists");
    }

    const hospital = this.hospitalRepository.create(dto);
    return this.hospitalRepository.save(hospital);
  }

  /**
   * Get hospital by ID
   */
  async getHospital(id: string): Promise<HospitalEntity> {
    const hospital = await this.hospitalRepository.findOne({ where: { id } });
    if (!hospital) {
      throw new NotFoundException(`Hospital ${id} not found`);
    }
    return hospital;
  }

  /**
   * Get hospitals with optional filtering
   */
  async getHospitals(city?: string, isVerified?: boolean): Promise<HospitalEntity[]> {
    const filters: any = {};
    if (city) {
      filters.city = city;
    }
    if (isVerified !== undefined) {
      filters.isVerified = isVerified;
    }
    return this.hospitalRepository.find({
      where: filters,
      order: { name: "ASC" },
    });
  }

  /**
   * Update hospital
   */
  async updateHospital(id: string, dto: Partial<CreateHospitalDto>): Promise<HospitalEntity> {
    const hospital = await this.getHospital(id);
    Object.assign(hospital, dto);
    return this.hospitalRepository.save(hospital);
  }

  /**
   * Delete hospital (soft delete not implemented, just remove)
   */
  async deleteHospital(id: string): Promise<void> {
    const hospital = await this.getHospital(id);
    await this.hospitalRepository.remove(hospital);
  }
}
