import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("gateway")
export class AuthRoutes {
  @Get("profile")
  @UseGuards(AuthGuard("jwt"))
  getProfile() {
    return { message: "Authenticated gateway profile route" };
  }
}
