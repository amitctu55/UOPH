import { DoctorService } from "./doctor.service";
import { CreateDoctorDto, UpdateDoctorDto, DoctorSearchDto } from "./dto/doctor.dto";
import { AvailabilityStatus } from "./entities/doctor.entity";
export declare class DoctorController {
    private readonly doctorService;
    private readonly logger;
    constructor(doctorService: DoctorService);
    createDoctorProfile(dto: CreateDoctorDto): Promise<import("./entities/doctor.entity").DoctorEntity>;
    searchDoctors(criteria: DoctorSearchDto): Promise<import("./entities/doctor.entity").DoctorEntity[]>;
    getDoctorProfile(doctorId: string): Promise<import("./entities/doctor.entity").DoctorEntity>;
    getDoctorByUserId(userId: string): Promise<import("./entities/doctor.entity").DoctorEntity>;
    updateDoctorProfile(doctorId: string, dto: UpdateDoctorDto): Promise<import("./entities/doctor.entity").DoctorEntity>;
    setAvailability(doctorId: string, status: AvailabilityStatus): Promise<import("./entities/doctor.entity").DoctorEntity>;
    addRating(doctorId: string, rating: number): Promise<import("./entities/doctor.entity").DoctorEntity>;
    verifyDoctor(doctorId: string): Promise<import("./entities/doctor.entity").DoctorEntity>;
    deactivateDoctor(doctorId: string): Promise<{
        message: string;
    }>;
}
