"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.getCollection = getCollection;
exports.disconnectDatabase = disconnectDatabase;
const mongodb_1 = require("mongodb");
let cachedClient = null;
let cachedDb = null;
async function connectToDatabase(uri, dbName) {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }
    const client = new mongodb_1.MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}
async function getCollection(collectionName) {
    if (!cachedDb) {
        throw new Error('Database not connected. Call connectToDatabase first.');
    }
    return cachedDb.collection(collectionName);
}
async function disconnectDatabase() {
    if (cachedClient) {
        await cachedClient.close();
        cachedClient = null;
        cachedDb = null;
    }
}
//# sourceMappingURL=mongo.connection.js.map