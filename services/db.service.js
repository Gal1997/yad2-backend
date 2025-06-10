import { MongoClient } from 'mongodb'

export const dbService = { getCollection }
let dbConn = null

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://galisraeli97:123465@cluster0.5llob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = process.env.DB_NAME || 'galtest';

async function getCollection(collectionName) {
    try {
        const db = await _connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function _connect() {
    if (dbConn) return dbConn

    try {
        const client = await MongoClient.connect(MONGO_URL)
        return dbConn = client.db(DB_NAME)
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}