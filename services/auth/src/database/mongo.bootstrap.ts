import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import mongoose, { ConnectOptions } from "mongoose";

const logger = new Logger("MongoBootstrap");

/** Atlas-recommended Stable API options from MongoDB onboarding snippet. */
export const atlasClientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  serverSelectionTimeoutMS: 15_000,
  family: 4,
};

let memoryServer: { getUri: (dbName?: string) => string; stop: () => Promise<boolean> } | null =
  null;

function redactUri(uri: string): string {
  return uri.replace(/\/\/([^@/]+)@/, "//***@");
}

export function isAtlasUri(uri: string): boolean {
  return /mongodb\+srv:\/\//i.test(uri) || /\.mongodb\.net/i.test(uri);
}

async function canConnect(uri: string, timeoutMs = 15_000): Promise<boolean> {
  try {
    const options: ConnectOptions = {
      ...(isAtlasUri(uri) ? atlasClientOptions : {}),
      serverSelectionTimeoutMS: timeoutMs,
      connectTimeoutMS: timeoutMs,
      family: 4,
    };
    const conn = await mongoose.createConnection(uri, options).asPromise();
    await conn.db?.admin().command({ ping: 1 });
    await conn.close();
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn(`Mongo probe failed for ${redactUri(uri)}: ${message.slice(0, 180)}`);
    return false;
  }
}

async function startMemoryMongo(): Promise<string> {
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  memoryServer = await MongoMemoryServer.create({
    instance: { dbName: "upchar_auth" },
  });
  return memoryServer.getUri("upchar_auth");
}

export async function resolveMongoUri(config: ConfigService): Promise<string> {
  const configured = (config.get<string>("MONGODB_URI") || "").trim();
  const forceMemory =
    config.get<string>("USE_MEMORY_MONGO") === "true" ||
    config.get<string>("USE_MEMORY_MONGO") === "1";
  const allowFallback =
    config.get<string>("ALLOW_MEMORY_FALLBACK") !== "false" &&
    config.get<string>("ALLOW_MEMORY_FALLBACK") !== "0";

  if (forceMemory || !configured) {
    const uri = await startMemoryMongo();
    logger.warn(`Embedded MongoDB enabled — ${uri}`);
    return uri;
  }

  logger.log(`Probing configured MongoDB URI (${redactUri(configured)})`);
  if (await canConnect(configured)) {
    logger.log("Configured MongoDB is reachable — using Atlas/remote URI");
    return configured;
  }

  if (!allowFallback) {
    throw new Error(
      "Configured MONGODB_URI is unreachable and ALLOW_MEMORY_FALLBACK=false. " +
        "Check Atlas Network Access (0.0.0.0/0 Active) and that the cluster is Running."
    );
  }

  const uri = await startMemoryMongo();
  logger.error(
    "Configured MongoDB unreachable (often Atlas IP allowlist). " +
      `Falling back to embedded MongoDB for this session: ${uri}`
  );
  return uri;
}

export async function stopMemoryMongo(): Promise<void> {
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}
