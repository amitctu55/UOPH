import { Controller, Get, Post, Put, Body, Param, Query, HttpCode, Logger } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto, UpdateDoctorDto, DoctorSearchDto } from "./dto/doctor.dto";
import { AvailabilityStatus } from "./entities/doctor.entity";

@ApiTags("Doctors")
@Controller("doctors")
export class DoctorController {
  private readonly logger = new Logger(DoctorController.name);

  constructor(private readonly doctorService: DoctorService) {}

  @Post("profile")
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiOperation({ summary: "Create doctor profile" })
  @ApiResponse({ status: 201, description: "Doctor profile created" })
  async createDoctorProfile(@Body() dto: CreateDoctorDto) {
    this.logger.log(`Creating doctor profile for user: ${dto.userId}`);
    return this.doctorService.createDoctorProfile(dto);
  }

  @Get("search")
  @ApiOperation({ summary: "Search doctors by criteria" })
  @ApiResponse({ status: 200, description: "Search results" })
  async searchDoctors(@Query() criteria: DoctorSearchDto) {
    this.logger.log("Searching doctors with criteria:", criteria);
    return this.doctorService.searchDoctors(criteria);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get doctor profile" })
  @ApiResponse({ status: 200, description: "Doctor profile" })
  async getDoctorProfile(@Param("id") doctorId: string) {
    this.logger.log(`Getting doctor profile: ${doctorId}`);
    return this.doctorService.getDoctorProfile(doctorId);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get doctor by user ID" })
  @ApiResponse({ status: 200, description: "Doctor profile" })
  async getDoctorByUserId(@Param("userId") userId: string) {
    this.logger.log(`Getting doctor profile by user ID: ${userId}`);
    return this.doctorService.getDoctorByUserId(userId);
  }

  @Put(":id/profile")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Update doctor profile" })
  @ApiResponse({ status: 200, description: "Profile updated" })
  async updateDoctorProfile(@Param("id") doctorId: string, @Body() dto: UpdateDoctorDto) {
    this.logger.log(`Updating doctor profile: ${doctorId}`);
    return this.doctorService.updateDoctorProfile(doctorId, dto);
  }

  @Put(":id/availability")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Set doctor availability" })
  @ApiResponse({ status: 200, description: "Availability updated" })
  async setAvailability(@Param("id") doctorId: string, @Body("status") status: AvailabilityStatus) {
    this.logger.log(`Setting availability for doctor: ${doctorId}`);
    return this.doctorService.setAvailability(doctorId, status);
  }

  @Post(":id/rating")
  @HttpCode(200)
  @ApiOperation({ summary: "Add rating to doctor" })
  @ApiResponse({ status: 200, description: "Rating added" })
  async addRating(@Param("id") doctorId: string, @Body("rating") rating: number) {
    this.logger.log(`Adding rating to doctor: ${doctorId}`);
    return this.doctorService.addRating(doctorId, rating);
  }

  @Post(":id/verify")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Verify doctor" })
  @ApiResponse({ status: 200, description: "Doctor verified" })
  async verifyDoctor(@Param("id") doctorId: string) {
    this.logger.log(`Verifying doctor: ${doctorId}`);
    return this.doctorService.verifyDoctor(doctorId);
  }

  @Post(":id/deactivate")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Deactivate doctor" })
  @ApiResponse({ status: 200, description: "Doctor deactivated" })
  async deactivateDoctor(@Param("id") doctorId: string) {
    this.logger.log(`Deactivating doctor: ${doctorId}`);
    return this.doctorService.deactivateDoctor(doctorId);
  }
}
