export declare class MedicineEntity {
    id: string;
    name: string;
    genericName?: string;
    strength?: string;
    form?: string;
    manufacturer?: string;
    hsnCode?: string;
    price?: number;
    requiresPrescription: boolean;
    stockQuantity: number;
    reorderLevel: number;
    createdAt: Date;
    updatedAt: Date;
}
