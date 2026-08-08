import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";
import { resolveMongoUri } from "./database/mongo.bootstrap";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const uri = await resolveMongoUri(config);
        return {
          uri,
          serverSelectionTimeoutMS: 10_000,
        };
      },
    }),
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
