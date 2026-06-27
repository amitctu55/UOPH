import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { HospitalService } from "./hospital.service";
import { CreateHospitalDto } from "./dto/create-hospital.dto";
import { UpdateHospitalDto } from "./dto/update-hospital.dto";
import { HospitalEntity } from "./entities/hospital.entity";

@ApiTags("Hospitals")
@Controller("hospitals")
export class HospitalController {
  constructor(private hospitalService: HospitalService) {}

  /**
   * Create a new hospital
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new hospital" })
  @ApiResponse({ status: 201, description: "Hospital created successfully" })
  @ApiResponse({ status: 400, description: "Hospital already exists" })
  async createHospital(@Body() dto: CreateHospitalDto): Promise<HospitalEntity> {
    return this.hospitalService.createHospital(dto);
  }

  /**
   * Get hospital by ID
   */
  @Get(":id")
  @ApiOperation({ summary: "Get hospital details" })
  @ApiResponse({ status: 200, description: "Hospital details" })
  @ApiResponse({ status: 404, description: "Hospital not found" })
  async getHospital(@Param("id") id: string): Promise<HospitalEntity> {
    return this.hospitalService.getHospital(id);
  }

  /**
   * Get hospitals with optional filtering
   */
  @Get()
  @ApiOperation({ summary: "Get list of hospitals" })
  @ApiResponse({ status: 200, description: "List of hospitals" })
  @ApiQuery({ name: "city", required: false, description: "Filter by city" })
  @ApiQuery({ name: "isVerified", required: false, description: "Filter by verification status" })
  @ApiQuery({ name: "skip", required: false, description: "Number of records to skip" })
  @ApiQuery({ name: "take", required: false, description: "Number of records to take" })
  async getHospitals(
    @Query("city") city?: string,
    @Query("isVerified") isVerified?: boolean,
    @Query("skip") skip: number = 0,
    @Query("take") take: number = 100
  ): Promise<HospitalEntity[]> {
    return this.hospitalService.getHospitals(
      skip,
      Number(take),
      city,
      isVerified === "true" ? true : isVerified === "false" ? false : undefined
    );
  }

  /**
   * Update hospital
   */
  @Put(":id")
  @ApiOperation({ summary: "Update hospital" })
  @ApiResponse({ status: 200, description: "Hospital updated" })
  @ApiResponse({ status: 404, description: "Hospital not found" })
  async updateHospital(
    @Param("id") id: string,
    @Body() dto: UpdateHospitalDto
  ): Promise<HospitalEntity> {
    return this.hospitalService.updateHospital(id, dto);
  }

  /**
   * Delete hospital
   */
  @Delete(":id")
  @ApiOperation({ summary: "Delete hospital" })
  @ApiResponse({ status: 200, description: "Hospital deleted" })
  @ApiResponse({ status: 404, description: "Hospital not found" })
  async deleteHospital(@Param("id") id: string): Promise<{ message: string }> {
    await this.hospitalService.deleteHospital(id);
    return { message: `Hospital ${id} deleted successfully` };
  }

  /**
   * Search hospitals by name or city
   */
  @Get("search/:query")
  @ApiOperation({ summary: "Search hospitals by name or city" })
  @ApiResponse({ status: 200, description: "Search results" })
  async searchHospitals(@Param("query") query: string): Promise<HospitalEntity[]> {
    return this.hospitalService.searchHospitals(query);
  }
}
