import { PharmacyService } from "./pharmacy.service";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { MedicineEntity } from "./entities/medicine.entity";
export declare class PharmacyController {
    private pharmacyService;
    constructor(pharmacyService: PharmacyService);
    createMedicine(dto: CreateMedicineDto): Promise<MedicineEntity>;
    getMedicine(id: string): Promise<MedicineEntity>;
    getMedicines(search?: string, requiresPrescription?: string): Promise<MedicineEntity[]>;
    updateMedicine(id: string, dto: UpdateMedicineDto): Promise<MedicineEntity>;
    deleteMedicine(id: string): Promise<{
        message: string;
    }>;
}
