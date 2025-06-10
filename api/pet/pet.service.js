import { dbService } from "../../services/db.service.js";

export const petService = {
    query
}

async function query() {
    try {
        const collection = await dbService.getCollection('pets')
        const pets = await collection.find().toArray();
        return pets;
    } catch (error) {
        throw error
    }
}