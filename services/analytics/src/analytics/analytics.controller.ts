import { Controller, Get, Query, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { AnalyticsService } from "./analytics.service";
import { BookingAnalyticsEntity } from "./entities/booking-analytics.entity";
import { UserAnalyticsEntity } from "./entities/user-analytics.entity";

@ApiTags("Analytics")
@Controller("analytics")
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  /**
   * Get booking analytics for a date range
   */
  @Get("booking")
  @ApiOperation({ summary: "Get booking analytics" })
  @ApiQuery({ name: "startDate", required: true, description: "Start date (YYYY-MM-DD)" })
  @ApiQuery({ name: "endDate", required: true, description: "End date (YYYY-MM-DD)" })
  @ApiResponse({
    status: 200,
    description: "Booking analytics data",
    type: [BookingAnalyticsEntity],
  })
  async getBookingAnalytics(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<BookingAnalyticsEntity[]> {
    return this.analyticsService.getBookingAnalytics(startDate, endDate);
  }

  /**
   * Get user analytics for a date range
   */
  @Get("user")
  @ApiOperation({ summary: "Get user analytics" })
  @ApiQuery({ name: "startDate", required: true, description: "Start date (YYYY-MM-DD)" })
  @ApiQuery({ name: "endDate", required: true, description: "End date (YYYY-MM-DD)" })
  @ApiResponse({ status: 200, description: "User analytics data", type: [UserAnalyticsEntity] })
  async getUserAnalytics(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<UserAnalyticsEntity[]> {
    return this.analyticsService.getUserAnalytics(startDate, endDate);
  }

  /**
   * Trigger generation of daily analytics (for testing/cron)
   */
  @Post("generate")
  @ApiOperation({ summary: "Generate analytics for a specific date" })
  @ApiQuery({ name: "date", required: true, description: "Date (YYYY-MM-DD)" })
  @ApiResponse({ status: 200, description: "Analytics generated" })
  async generateAnalytics(@Query("date") date: string): Promise<{ message: string }> {
    await this.analyticsService.generateDailyBookingAnalytics(date);
    await this.analyticsService.generateDailyUserAnalytics(date);
    return { message: `Analytics generated for ${date}` };
  }
}
