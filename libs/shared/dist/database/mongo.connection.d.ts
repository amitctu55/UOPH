import { MongoClient, Db, Collection } from 'mongodb';
export declare function connectToDatabase(uri: string, dbName: string): Promise<{
    client: MongoClient;
    db: Db;
}>;
export declare function getCollection(collectionName: string): Promise<Collection>;
export declare function disconnectDatabase(): Promise<void>;
