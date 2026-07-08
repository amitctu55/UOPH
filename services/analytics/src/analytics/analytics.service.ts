import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { BookingAnalyticsEntity } from "./entities/booking-analytics.entity";
import { UserAnalyticsEntity } from "./entities/user-analytics.entity";

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectRepository(BookingAnalyticsEntity)
    private bookingRepo: Repository<BookingAnalyticsEntity>,
    @InjectRepository(UserAnalyticsEntity)
    private userRepo: Repository<UserAnalyticsEntity>
  ) {}

  /**
   * Get booking analytics for a date range
   */
  async getBookingAnalytics(startDate: string, endDate: string): Promise<BookingAnalyticsEntity[]> {
    return this.bookingRepo.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: { date: "ASC" },
    });
  }

  /**
   * Get user analytics for a date range
   */
  async getUserAnalytics(startDate: string, endDate: string): Promise<UserAnalyticsEntity[]> {
    return this.userRepo.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: { date: "ASC" },
    });
  }

  /**
   * Generate daily booking analytics (to be called by cron or manually)
   * This would typically aggregate data from appointments, payments, etc.
   * For simplicity, we'll create a placeholder record.
   */
  async generateDailyBookingAnalytics(date: string): Promise<void> {
    // Check if record already exists for this date
    const existing = await this.bookingRepo.findOne({ where: { date } });
    if (existing) {
      this.logger.log(`Booking analytics for ${date} already exists`);
      return;
    }

    // In a real implementation, you would aggregate data from:
    // - appointments table for that date
    // - payments table for that date
    // For now, we'll create a dummy record
    const analytics = this.bookingRepo.create({
      date,
      totalBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      noShowBookings: 0,
      revenueGenerated: 0,
      uniquePatients: 0,
    });

    await this.bookingRepo.save(analytics);
    this.logger.log(`Generated booking analytics for ${date}`);
  }

  /**
   * Generate daily user analytics
   */
  async generateDailyUserAnalytics(date: string): Promise<void> {
    const existing = await this.userRepo.findOne({ where: { date } });
    if (existing) {
      this.logger.log(`User analytics for ${date} already exists`);
      return;
    }

    // In reality, aggregate from users table
    const analytics = this.userRepo.create({
      date,
      totalUsers: 0,
      newPatients: 0,
      newDoctors: 0,
      activeUsers: 0,
    });

    await this.userRepo.save(analytics);
    this.logger.log(`Generated user analytics for ${date}`);
  }
}
