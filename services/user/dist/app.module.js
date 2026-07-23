"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const terminus_1 = require("@nestjs/terminus");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV || "development"}`,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: process.env.DATABASE_HOST || "localhost",
                port: parseInt(process.env.DATABASE_PORT || "5432"),
                username: process.env.DATABASE_USER || "postgres",
                password: process.env.DATABASE_PASSWORD || "postgres",
                database: process.env.DATABASE_NAME || "upchardb",
                entities: ["src/**/*.entity.ts"],
                synchronize: false,
                migrations: ["src/migrations/*.ts"],
            }),
            terminus_1.HealthModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map