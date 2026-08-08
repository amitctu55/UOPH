import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";

const logger = new Logger("MongoBootstrap");

let memoryServer: { getUri: (dbName?: string) => string; stop: () => Promise<boolean> } | null =
  null;

export async function resolveMongoUri(config: ConfigService): Promise<string> {
  const configured = (config.get<string>("MONGODB_URI") || "").trim();
  const useMemory =
    config.get<string>("USE_MEMORY_MONGO") === "true" ||
    config.get<string>("USE_MEMORY_MONGO") === "1" ||
    !configured;

  if (!useMemory && configured) {
    logger.log(`Using configured MongoDB URI`);
    return configured;
  }

  const { MongoMemoryServer } = await import("mongodb-memory-server");
  memoryServer = await MongoMemoryServer.create({
    instance: { dbName: "upchar_auth" },
  });
  const uri = memoryServer.getUri("upchar_auth");
  logger.warn(`USE_MEMORY_MONGO enabled — embedded MongoDB at ${uri}`);
  return uri;
}

export async function stopMemoryMongo(): Promise<void> {
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}
