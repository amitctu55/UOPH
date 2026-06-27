import { Repository } from "typeorm";
import { HospitalEntity } from "../hospital/src/hospital/entities/hospital.entity";
import { DoctorEntity } from "../doctor/src/doctor/entities/doctor.entity";
export declare class SearchService {
    private hospitalRepo;
    private doctorRepo;
    private readonly logger;
    constructor(hospitalRepo: Repository<HospitalEntity>, doctorRepo: Repository<DoctorEntity>);
    searchHospitals(query: string): Promise<HospitalEntity[]>;
    searchDoctors(query: string): Promise<DoctorEntity[]>;
    searchAll(query: string): Promise<{
        hospitals: HospitalEntity[];
        doctors: DoctorEntity[];
    }>;
}
