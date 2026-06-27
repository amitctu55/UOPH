import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Logger,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { AppointmentEntity } from "./entities/appointment.entity";
import { JwtGuard } from "../common/guards/jwt.guard";

@ApiTags("Appointments")
@Controller("appointments")
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class AppointmentController {
  private readonly logger = new Logger(AppointmentController.name);

  constructor(private appointmentService: AppointmentService) {}

  /**
   * Book a new appointment
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Book a new appointment" })
  @ApiResponse({ status: 201, description: "Appointment booked successfully" })
  @ApiResponse({ status: 400, description: "Slot unavailable or validation error" })
  async bookAppointment(@Body() dto: CreateAppointmentDto): Promise<AppointmentEntity> {
    this.logger.log(`Booking appointment for patient ${dto.patientId}`);
    return this.appointmentService.bookAppointment(dto);
  }

  /**
   * Get appointment by ID
   */
  @Get(":id")
  @ApiOperation({ summary: "Get appointment details" })
  @ApiResponse({ status: 200, description: "Appointment details" })
  @ApiResponse({ status: 404, description: "Appointment not found" })
  async getAppointment(@Param("id") id: string): Promise<AppointmentEntity> {
    return this.appointmentService.getAppointment(id);
  }

  /**
   * Get patient's appointments
   */
  @Get("patient/:patientId")
  @ApiOperation({ summary: "Get all appointments for a patient" })
  async getPatientAppointments(
    @Param("patientId") patientId: string
  ): Promise<AppointmentEntity[]> {
    return this.appointmentService.getPatientAppointments(patientId);
  }

  /**
   * Get doctor's appointments
   */
  @Get("doctor/:doctorId")
  @ApiOperation({ summary: "Get all appointments for a doctor" })
  async getDoctorAppointments(@Param("doctorId") doctorId: string): Promise<AppointmentEntity[]> {
    return this.appointmentService.getDoctorAppointments(doctorId);
  }

  /**
   * Get doctor's availability
   */
  @Get("doctor/:doctorId/availability")
  @ApiOperation({ summary: "Get available slots for a doctor" })
  async getDoctorAvailability(
    @Param("doctorId") doctorId: string,
    @Query("date") date: string
  ): Promise<{ availableSlots: string[] }> {
    return this.appointmentService.getDoctorAvailability(doctorId, new Date(date));
  }

  /**
   * Reschedule an appointment
   */
  @Put(":id/reschedule")
  @ApiOperation({ summary: "Reschedule an appointment" })
  async rescheduleAppointment(
    @Param("id") id: string,
    @Body() dto: UpdateAppointmentDto
  ): Promise<AppointmentEntity> {
    return this.appointmentService.rescheduleAppointment(id, dto);
  }

  /**
   * Cancel an appointment
   */
  @Put(":id/cancel")
  @ApiOperation({ summary: "Cancel an appointment" })
  async cancelAppointment(
    @Param("id") id: string,
    @Body() body: { reason: string }
  ): Promise<AppointmentEntity> {
    return this.appointmentService.cancelAppointment(id, body.reason);
  }

  /**
   * Mark appointment as completed
   */
  @Put(":id/complete")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Mark appointment as completed" })
  async completeAppointment(@Param("id") id: string): Promise<AppointmentEntity> {
    return this.appointmentService.completeAppointment(id);
  }

  /**
   * Get statistics
   */
  @Get("statistics")
  @ApiOperation({ summary: "Get appointment statistics" })
  async getStatistics(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<any> {
    return this.appointmentService.getStatistics(new Date(startDate), new Date(endDate));
  }
}
