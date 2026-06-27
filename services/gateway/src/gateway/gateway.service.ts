import { Injectable, BadRequestException } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";

@Injectable()
export class GatewayService {
  private getBaseUrl(envKey: string) {
    const baseUrl = process.env[envKey];
    if (!baseUrl) {
      throw new BadRequestException(`Missing environment configuration for ${envKey}`);
    }
    return baseUrl;
  }

  async proxyGet(path: string, envKey: string) {
    const url = `${this.getBaseUrl(envKey)}${path}`;
    const response = await axios.get(url, this.getRequestOptions());
    return response.data;
  }

  async proxyPost(path: string, body: any, envKey: string) {
    const url = `${this.getBaseUrl(envKey)}${path}`;
    const response = await axios.post(url, body, this.getRequestOptions());
    return response.data;
  }

  private getRequestOptions(): AxiosRequestConfig {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    };
  }
}
