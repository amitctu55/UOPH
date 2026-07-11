import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PatientService } from "../services/patient.service";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { UpdatePatientDto } from "../dto/update-patient.dto";
import { PatientEntity } from "../entities/patient.entity";
import { JwtGuard } from "../../auth/jwt.guard";

@ApiTags("Patients")
@Controller("patients")
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class PatientController {
  constructor(private patientService: PatientService) {}

  /**
   * Create a new patient profile
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create patient profile" })
  @ApiResponse({ status: 201, description: "Patient profile created" })
  @ApiResponse({ status: 400, description: "Invalid input" })
  async createPatient(
    @Body() dto: CreatePatientDto,
    @Req() request: any
  ): Promise<PatientEntity> {
    // In a real implementation, you would validate that the user has permission
    // to create a patient profile (e.g., they are the user themselves or an admin)
    return this.patientService.createPatient(dto);
  }

  /**
   * Get patient by ID
   */
  @Get(":id")
  @ApiOperation({ summary: "Get patient by ID" })
  @ApiResponse({ status: 200, description: "Patient found" })
  @ApiResponse({ status: 404, description: "Patient not found" })
  async getPatientById(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<PatientEntity> {
    return this.patientService.getPatientById(id);
  }

  /**
   * Get patient by user ID
   */
  @Get("user/:userId")
  @ApiOperation({ summary: "Get patient by user ID" })
  @ApiResponse({ status: 200, description: "Patient found" })
  @ApiResponse({ status: 404, description: "Patient not found" })
  async getPatientByUserId(
    @Param("userId", ParseUUIDPipe) userId: string
  ): Promise<PatientEntity> {
    return this.patientService.getPatientByUserId(userId);
  }

  /**
   * Update patient information
   */
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update patient information" })
  @ApiResponse({ status: 200, description: "Patient updated" })
  @ApiResponse({ status: 404, description: "Patient not found" })
  async updatePatient(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdatePatientDto
  ): Promise<PatientEntity> {
    return this.patientService.updatePatient(id, dto);
  }

  /**
   * Deactivate patient (soft delete by marking as deceased)
   */
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Deactivate patient" })
  @ApiResponse({ status: 200, description: "Patient deactivated" })
  @ApiResponse({ status: 404, description: "Patient not found" })
  async deactivatePatient(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<{ message: string }> {
    return this.patientService.deactivatePatient(id);
  }
}