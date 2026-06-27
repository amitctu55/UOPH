import { Controller, Get, Post, Put, Body, Param, HttpCode, Logger } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { ConsultationService } from "./consultation.service";
import {
  CreateConsultationDto,
  UpdateConsultationDto,
  StartConsultationDto,
  EndConsultationDto,
} from "./dto/consultation.dto";

@ApiTags("Consultations")
@Controller("consultations")
export class ConsultationController {
  private readonly logger = new Logger(ConsultationController.name);

  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiOperation({ summary: "Create consultation" })
  async createConsultation(@Body() dto: CreateConsultationDto) {
    this.logger.log(`Creating consultation`);
    return this.consultationService.createConsultation(dto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get consultation details" })
  async getConsultation(@Param("id") consultationId: string) {
    this.logger.log(`Getting consultation: ${consultationId}`);
    return this.consultationService.getConsultation(consultationId);
  }

  @Get("patient/:patientId")
  @ApiOperation({ summary: "Get patient consultations" })
  async getPatientConsultations(@Param("patientId") patientId: string) {
    return this.consultationService.getPatientConsultations(patientId);
  }

  @Get("doctor/:doctorId")
  @ApiOperation({ summary: "Get doctor consultations" })
  async getDoctorConsultations(@Param("doctorId") doctorId: string) {
    return this.consultationService.getDoctorConsultations(doctorId);
  }

  @Post(":id/start")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Start consultation" })
  async startConsultation(@Param("id") consultationId: string, @Body() dto: StartConsultationDto) {
    this.logger.log(`Starting consultation: ${consultationId}`);
    return this.consultationService.startConsultation(consultationId, dto);
  }

  @Post(":id/end")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "End consultation" })
  async endConsultation(@Param("id") consultationId: string, @Body() dto: EndConsultationDto) {
    this.logger.log(`Ending consultation: ${consultationId}`);
    return this.consultationService.endConsultation(consultationId, dto);
  }

  @Put(":id")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Update consultation" })
  async updateConsultation(
    @Param("id") consultationId: string,
    @Body() dto: UpdateConsultationDto
  ) {
    this.logger.log(`Updating consultation: ${consultationId}`);
    return this.consultationService.updateConsultation(consultationId, dto);
  }

  @Post(":id/cancel")
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: "Cancel consultation" })
  async cancelConsultation(@Param("id") consultationId: string) {
    this.logger.log(`Cancelling consultation: ${consultationId}`);
    return this.consultationService.cancelConsultation(consultationId);
  }
}
