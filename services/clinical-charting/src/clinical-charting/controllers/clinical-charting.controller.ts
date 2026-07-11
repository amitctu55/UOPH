import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ClinicalChartingService } from "./services/clinical-charting.service";
import {
  CreateClinicalChartingDataDto,
} from "./dtos/create-clinical-charting.dto";
import {
  UpdateClinicalChartingDataDto,
} from "./dtos/update-clinical-charting.dto";
import { ClinicalDataType } from "./entities/clinical-charting.entity";
import { JwtGuard } from "../../auth/jwt.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Clinical Charting")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("clinical-charting")
export class ClinicalChartingController {
  constructor(
    private clinicalChartingService: ClinicalChartingService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create clinical charting data" })
  @ApiResponse({
    status: 201,
    description: "Clinical data created successfully",
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  async createClinicalData(
    @Body() createClinicalDataDto: CreateClinicalChartingDataDto,
    @Request() req,
  ) {
    // In a real system, you might want to verify the user has permission
    // to create data for this patient (e.g., they are the patient's provider)
    // For now, we'll associate the request user as the provider
    createClinicalDataDto.providerId = req.user.userId;

    return this.clinicalChartingService.createClincalChartingData(
      createClinicalDataDto,
    );
  }

  @Get(":id")
  @ApiOperation({ summary: "Get clinical charting data by ID" })
  @ApiResponse({
    status: 200,
    description: "Clinical data retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Clinical data not found" })
  async getClinicalDataById(
    @Param("id", ParseUUIDPipe) id: string,
    @Request() req,
  ) {
    return this.clinicalChartingService.getClinicalDataById(
      id,
      req.user.userId,
    );
  }

  @Get("patient/:patientId")
  @ApiOperation({ summary: "Get all clinical charting data for a patient" })
  @ApiResponse({
    status: 200,
    description: "Clinical data retrieved successfully",
  })
  @ApiResponse({ status: 403, description: "Access denied" })
  async getClinicalDataByPatientId(
    @Param("patientId", ParseUUIDPipe) patientId: string,
    @Request() req,
  ) {
    return this.clinicalChartingService.getClinicalDataByPatientId(
      patientId,
      req.user.userId,
    );
  }

  @Get("patient/:patientId/type/:type")
  @ApiOperation({ summary: "Get clinical charting data by type for a patient" })
  @ApiResponse({
    status: 200,
    description: "Clinical data retrieved successfully",
  })
  @ApiResponse({ status: 403, description: "Access denied" })
  async getClinicalDataByType(
    @Param("patientId", ParseUUIDPipe) patientId: string,
    @Param("type") type: ClinicalDataType,
    @Request() req,
  ) {
    return this.clinicalChartingService.getClinicalDataByType(
      patientId,
      type,
      req.user.userId,
    );
  }

  @Put(":id")
  @ApiOperation({ summary: "Update clinical charting data" })
  @ApiResponse({
    status: 200,
    description: "Clinical data updated successfully",
  })
  @ApiResponse({ status: 404, description: "Clinical data not found" })
  @ApiResponse({ status: 403, description: "Access denied" })
  async updateClinicalData(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateClinicalDataDto: UpdateClinicalChartingDataDto,
    @Request() req,
  ) {
    return this.clinicalChartingService.updateClinicalData(
      id,
      updateClinicalDataDto,
      req.user.userId,
    );
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Deactivate clinical charting data" })
  @ApiResponse({
    status: 200,
    description: "Clinical data deactivated successfully",
  })
  @ApiResponse({ status: 404, description: "Clinical data not found" })
  @ApiResponse({ status: 403, description: "Access denied" })
  async deactivateClinicalData(
    @Param("id", ParseUUIDPipe) id: string,
    @Request() req,
  ) {
    return this.clinicalChartingService.deactivateClinicalData(
      id,
      req.user.userId,
    );
  }
}