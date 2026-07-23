import { Repository } from "typeorm";
import { DoctorEntity, DoctorSpecialization, AvailabilityStatus } from "./entities/doctor.entity";
import { CreateDoctorDto, UpdateDoctorDto, DoctorSearchDto } from "./dto/doctor.dto";
export declare class DoctorService {
    private readonly doctorRepository;
    private readonly logger;
    constructor(doctorRepository: Repository<DoctorEntity>);
    createDoctorProfile(dto: CreateDoctorDto): Promise<DoctorEntity>;
    getDoctorProfile(doctorId: string): Promise<DoctorEntity>;
    getDoctorByUserId(userId: string): Promise<DoctorEntity>;
    updateDoctorProfile(doctorId: string, dto: UpdateDoctorDto): Promise<DoctorEntity>;
    searchDoctors(criteria: DoctorSearchDto, limit?: number): Promise<DoctorEntity[]>;
    getDoctorsBySpecialization(specialization: DoctorSpecialization): Promise<DoctorEntity[]>;
    getDoctorsByHospital(hospitalId: string): Promise<DoctorEntity[]>;
    setAvailability(doctorId: string, status: AvailabilityStatus): Promise<DoctorEntity>;
    addRating(doctorId: string, rating: number): Promise<DoctorEntity>;
    incrementConsultationCount(doctorId: string): Promise<void>;
    verifyDoctor(doctorId: string): Promise<DoctorEntity>;
    deactivateDoctor(doctorId: string): Promise<{
        message: string;
    }>;
}
