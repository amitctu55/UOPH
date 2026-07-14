import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { HospitalEntity } from "../../../hospital/src/hospital/entities/hospital.entity";
import { DoctorEntity } from "../../../doctor/src/doctor/entities/doctor.entity";

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(HospitalEntity)
    private hospitalRepo: Repository<HospitalEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>
  ) {}

  /**
   * Search hospitals by name, city, or bio
   */
  async searchHospitals(query: string): Promise<HospitalEntity[]> {
    const searchTerm = `%${query}%`;
    return this.hospitalRepo.find({
      where: [{ name: ILike(searchTerm) }, { city: ILike(searchTerm) }, { bio: ILike(searchTerm) }],
      take: 20,
    });
  }

  /**
   * Search doctors by name, specialization, or bio
   */
  async searchDoctors(query: string): Promise<DoctorEntity[]> {
    const searchTerm = `%${query}%`;
    return this.doctorRepo.find({
      where: [
        { firstName: ILike(searchTerm) },
        { lastName: ILike(searchTerm) },
        { specialization: ILike(searchTerm) },
        { bio: ILike(searchTerm) },
      ],
      take: 20,
    });
  }

  /**
   * Search across hospitals and doctors
   */
  async searchAll(query: string): Promise<{
    hospitals: HospitalEntity[];
    doctors: DoctorEntity[];
  }> {
    return {
      hospitals: await this.searchHospitals(query),
      doctors: await this.searchDoctors(query),
    };
  }
}
