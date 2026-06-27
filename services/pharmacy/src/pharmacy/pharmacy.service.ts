import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicineEntity } from "./entities/medicine.entity";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";

@Injectable()
export class PharmacyService {
  private readonly logger = new Logger(PharmacyService.name);

  constructor(
    @InjectRepository(MedicineEntity)
    private medicineRepository: Repository<MedicineEntity>
  ) {}

  /**
   * Create a new medicine
   */
  async createMedicine(dto: CreateMedicineDto): Promise<MedicineEntity> {
    this.logger.log(`Creating medicine: ${dto.name}`);

    // Check if medicine with same name already exists
    const existing = await this.medicineRepository.findOne({
      where: { name: dto.name },
    });
    if (existing) {
      throw new Error("Medicine with this name already exists");
    }

    const medicine = this.medicineRepository.create(dto);
    return this.medicineRepository.save(medicine);
  }

  /**
   * Get medicine by ID
   */
  async getMedicine(id: string): Promise<MedicineEntity> {
    const medicine = await this.medicineRepository.findOne({
      where: { id },
    });
    if (!medicine) {
      throw new NotFoundException(`Medicine ${id} not found`);
    }
    return medicine;
  }

  /**
   * Get medicines with optional filtering
   */
  async getMedicines(search?: string, requiresPrescription?: boolean): Promise<MedicineEntity[]> {
    const filters: any = {};
    if (requiresPrescription !== undefined) {
      filters.requiresPrescription = requiresPrescription;
    }

    if (search) {
      // Simple search on name or genericName
      return this.medicineRepository.find({
        where: [{ name: `%${search}%` }, { genericName: `%${search}%` }],
        where: filters,
        order: { name: "ASC" },
      });
    }

    return this.medicineRepository.find({
      where: filters,
      order: { name: "ASC" },
    });
  }

  /**
   * Update medicine
   */
  async updateMedicine(id: string, dto: UpdateMedicineDto): Promise<MedicineEntity> {
    const medicine = await this.getMedicine(id);
    this.medicineRepository.merge(medicine, dto);
    return this.medicineRepository.save(medicine);
  }

  /**
   * Delete medicine
   */
  async deleteMedicine(id: string): Promise<void> {
    const medicine = await this.getMedicine(id);
    await this.medicineRepository.remove(medicine);
  }
}
