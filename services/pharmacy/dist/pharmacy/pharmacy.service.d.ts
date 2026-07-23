import { Repository } from "typeorm";
import { MedicineEntity } from "./entities/medicine.entity";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
export declare class PharmacyService {
    private medicineRepository;
    private readonly logger;
    constructor(medicineRepository: Repository<MedicineEntity>);
    createMedicine(dto: CreateMedicineDto): Promise<MedicineEntity>;
    getMedicine(id: string): Promise<MedicineEntity>;
    getMedicines(search?: string, requiresPrescription?: boolean): Promise<MedicineEntity[]>;
    updateMedicine(id: string, dto: UpdateMedicineDto): Promise<MedicineEntity>;
    deleteMedicine(id: string): Promise<void>;
}
