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
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { PharmacyService } from "./pharmacy.service";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { MedicineEntity } from "./entities/medicine.entity";

@ApiTags("Medicines")
@Controller("medicines")
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

  /**
   * Create a new medicine
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new medicine" })
  @ApiResponse({ status: 201, description: "Medicine created successfully" })
  @ApiResponse({ status: 400, description: "Medicine already exists" })
  async createMedicine(@Body() dto: CreateMedicineDto): Promise<MedicineEntity> {
    return this.pharmacyService.createMedicine(dto);
  }

  /**
   * Get medicine by ID
   */
  @Get(":id")
  @ApiOperation({ summary: "Get medicine details" })
  @ApiResponse({ status: 200, description: "Medicine details" })
  @ApiResponse({ status: 404, description: "Medicine not found" })
  async getMedicine(@Param("id") id: string): Promise<MedicineEntity> {
    return this.pharmacyService.getMedicine(id);
  }

  /**
   * Get medicines with optional filtering
   */
  @Get()
  @ApiOperation({ summary: "Get list of medicines" })
  @ApiResponse({ status: 200, description: "List of medicines" })
  @ApiQuery({ name: "search", required: false, description: "Search by name" })
  @ApiQuery({
    name: "requiresPrescription",
    required: false,
    description: "Filter by prescription requirement",
  })
  async getMedicines(
    @Query("search") search?: string,
    @Query("requiresPrescription") requiresPrescription?: string
  ): Promise<MedicineEntity[]> {
    return this.pharmacyService.getMedicines(
      search,
      // Convert string to boolean if provided
      requiresPrescription === "true" ? true : requiresPrescription === "false" ? false : undefined
    );
  }

  /**
   * Update medicine
   */
  @Put(":id")
  @ApiOperation({ summary: "Update medicine" })
  @ApiResponse({ status: 200, description: "Medicine updated" })
  @ApiResponse({ status: 404, description: "Medicine not found" })
  async updateMedicine(
    @Param("id") id: string,
    @Body() dto: UpdateMedicineDto
  ): Promise<MedicineEntity> {
    return this.pharmacyService.updateMedicine(id, dto);
  }

  /**
   * Delete medicine
   */
  @Delete(":id")
  @ApiOperation({ summary: "Delete medicine" })
  @ApiResponse({ status: 200, description: "Medicine deleted" })
  @ApiResponse({ status: 404, description: "Medicine not found" })
  async deleteMedicine(@Param("id") id: string): Promise<{ message: string }> {
    await this.pharmacyService.deleteMedicine(id);
    return { message: `Medicine ${id} deleted successfully` };
  }
}
