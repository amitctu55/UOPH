"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let GatewayService = class GatewayService {
    getBaseUrl(envKey) {
        const baseUrl = process.env[envKey];
        if (!baseUrl) {
            throw new common_1.BadRequestException(`Missing environment configuration for ${envKey}`);
        }
        return baseUrl;
    }
    async proxyGet(path, envKey) {
        const url = `${this.getBaseUrl(envKey)}${path}`;
        const response = await axios_1.default.get(url, this.getRequestOptions());
        return response.data;
    }
    async proxyPost(path, body, envKey) {
        const url = `${this.getBaseUrl(envKey)}${path}`;
        const response = await axios_1.default.post(url, body, this.getRequestOptions());
        return response.data;
    }
    getRequestOptions() {
        return {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 10000,
        };
    }
};
exports.GatewayService = GatewayService;
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)()
], GatewayService);
//# sourceMappingURL=gateway.service.js.map