import { Injectable, Logger, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { AppointmentEntity } from "./entities/appointment.entity";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { AppointmentStatusEnum } from "./enums/appointment-status.enum";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger(AppointmentService.name);

  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>
  ) {}

  /**
   * Book a new appointment
   */
  async bookAppointment(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
    this.logger.log(`Booking appointment for patient ${dto.patientId}`);

    // Check if appointment slot is available
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctorId: dto.doctorId,
        appointmentDate: dto.appointmentDate,
        appointmentTime: dto.appointmentTime,
        status: AppointmentStatusEnum.SCHEDULED,
      },
    });

    if (existingAppointment) {
      throw new BadRequestException("Appointment slot is already booked");
    }

    // Check if patient already has appointment at same time
    const patientConflict = await this.appointmentRepository.findOne({
      where: {
        patientId: dto.patientId,
        appointmentDate: dto.appointmentDate,
        appointmentTime: dto.appointmentTime,
        status: AppointmentStatusEnum.SCHEDULED,
      },
    });

    if (patientConflict) {
      throw new BadRequestException("Patient already has appointment at this time");
    }

    const appointment = this.appointmentRepository.create({
      ...dto,
      status: AppointmentStatusEnum.SCHEDULED,
    });

    return this.appointmentRepository.save(appointment);
  }

  /**
   * Get appointment by ID
   */
  async getAppointment(id: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new NotFoundException(`Appointment ${id} not found`);
    }
    return appointment;
  }

  /**
   * Get patient's appointments
   */
  async getPatientAppointments(patientId: string): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.find({
      where: { patientId },
      order: { appointmentDate: "DESC" },
    });
  }

  /**
   * Get doctor's appointments
   */
  async getDoctorAppointments(doctorId: string): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.find({
      where: { doctorId },
      order: { appointmentDate: "DESC" },
    });
  }

  /**
   * Get doctor's availability for a specific date
   */
  async getDoctorAvailability(doctorId: string, date: Date): Promise<{ availableSlots: string[] }> {
    // Get all booked slots for the doctor on that date
    const bookedAppointments = await this.appointmentRepository.find({
      where: {
        doctorId,
        appointmentDate: date,
        status: AppointmentStatusEnum.SCHEDULED,
      },
      select: ["appointmentTime"],
    });

    const bookedTimes = bookedAppointments.map(a => a.appointmentTime);

    // Generate available slots (30-minute intervals, 9 AM to 5 PM)
    const availableSlots: string[] = [];
    for (let hour = 9; hour < 17; hour++) {
      for (const minute of [0, 30]) {
        const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        if (!bookedTimes.includes(timeString)) {
          availableSlots.push(timeString);
        }
      }
    }

    return { availableSlots };
  }

  /**
   * Reschedule an appointment
   */
  async rescheduleAppointment(
    appointmentId: string,
    dto: UpdateAppointmentDto
  ): Promise<AppointmentEntity> {
    const appointment = await this.getAppointment(appointmentId);

    if (appointment.status !== AppointmentStatusEnum.SCHEDULED) {
      throw new BadRequestException("Can only reschedule scheduled appointments");
    }

    // Check new slot availability
    const conflict = await this.appointmentRepository.findOne({
      where: {
        doctorId: appointment.doctorId,
        appointmentDate: dto.appointmentDate,
        appointmentTime: dto.appointmentTime,
        status: AppointmentStatusEnum.SCHEDULED,
      },
    });

    if (conflict) {
      throw new BadRequestException("New appointment slot is already booked");
    }

    appointment.appointmentDate = dto.appointmentDate;
    appointment.appointmentTime = dto.appointmentTime;
    appointment.updatedAt = new Date();

    return this.appointmentRepository.save(appointment);
  }

  /**
   * Cancel an appointment
   */
  async cancelAppointment(appointmentId: string, reason: string): Promise<AppointmentEntity> {
    const appointment = await this.getAppointment(appointmentId);

    if (appointment.status === AppointmentStatusEnum.CANCELLED) {
      throw new BadRequestException("Appointment is already cancelled");
    }

    appointment.status = AppointmentStatusEnum.CANCELLED;
    appointment.cancellationReason = reason;
    appointment.cancelledAt = new Date();
    appointment.updatedAt = new Date();

    return this.appointmentRepository.save(appointment);
  }

  /**
   * Mark appointment as completed
   */
  async completeAppointment(appointmentId: string): Promise<AppointmentEntity> {
    const appointment = await this.getAppointment(appointmentId);

    if (appointment.status !== AppointmentStatusEnum.SCHEDULED) {
      throw new BadRequestException("Can only complete scheduled appointments");
    }

    appointment.status = AppointmentStatusEnum.COMPLETED;
    appointment.updatedAt = new Date();

    return this.appointmentRepository.save(appointment);
  }

  /**
   * Cron job to mark no-show appointments
   * Runs daily at 11 PM to check for missed appointments
   */
  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async markNoShowAppointments(): Promise<void> {
    this.logger.log("Running no-show appointment check...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const missedAppointments = await this.appointmentRepository.find({
      where: {
        appointmentDate: Between(today, tomorrow),
        status: AppointmentStatusEnum.SCHEDULED,
      },
    });

    for (const appointment of missedAppointments) {
      appointment.status = AppointmentStatusEnum.NO_SHOW;
      appointment.updatedAt = new Date();
      await this.appointmentRepository.save(appointment);
    }

    this.logger.log(`Marked ${missedAppointments.length} appointments as no-show`);
  }

  /**
   * Get appointments statistics
   */
  async getStatistics(startDate: Date, endDate: Date): Promise<any> {
    const appointments = await this.appointmentRepository.find({
      where: {
        appointmentDate: Between(startDate, endDate),
      },
    });

    const stats = {
      total: appointments.length,
      scheduled: appointments.filter(a => a.status === AppointmentStatusEnum.SCHEDULED).length,
      completed: appointments.filter(a => a.status === AppointmentStatusEnum.COMPLETED).length,
      cancelled: appointments.filter(a => a.status === AppointmentStatusEnum.CANCELLED).length,
      noShow: appointments.filter(a => a.status === AppointmentStatusEnum.NO_SHOW).length,
    };

    return stats;
  }
}
