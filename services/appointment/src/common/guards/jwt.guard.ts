import { Injectable, CanActivate } from "@nestjs/common";

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}
