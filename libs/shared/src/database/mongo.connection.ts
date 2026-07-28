import { MongoClient, Db, Collection } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(uri: string, dbName: string): Promise<{ client: MongoClient; db: Db }> {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // If no connection, create a new one
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);

  // Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getCollection(collectionName: string): Promise<Collection> {
  if (!cachedDb) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return cachedDb.collection(collectionName);
}

export async function disconnectDatabase(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}