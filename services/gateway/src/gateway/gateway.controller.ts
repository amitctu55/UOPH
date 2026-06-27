import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { GatewayService } from "./gateway.service";

@Controller("gateway")
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get("user/:id")
  async getUser(@Param("id") id: string) {
    return this.gatewayService.proxyGet(`/user/${id}`, "USER_SERVICE_URL");
  }

  @Post("user/search")
  async searchUsers(@Body() body: any) {
    return this.gatewayService.proxyPost("/user/search", body, "USER_SERVICE_URL");
  }

  @Get("appointment/:id")
  async getAppointment(@Param("id") id: string) {
    return this.gatewayService.proxyGet(`/appointment/${id}`, "APPOINTMENT_SERVICE_URL");
  }

  @Post("appointment/book")
  async bookAppointment(@Body() body: any) {
    return this.gatewayService.proxyPost("/appointment/book", body, "APPOINTMENT_SERVICE_URL");
  }
}
