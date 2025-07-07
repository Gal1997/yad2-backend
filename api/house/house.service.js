import { dbService } from '../../services/db.service.js';
import { ObjectId } from 'mongodb';

export const houseService = {
    query,
    getById,
    add,
};

async function query() {
    const collection = await dbService.getCollection('houses');
    return await collection.find().toArray();
}

async function getById(id) {
    const collection = await dbService.getCollection('houses');
    return await collection.findOne({ _id: new ObjectId(String(id)) });
}

async function add(house) {
    // GAL : ill need to pass ObjectID of logged in user I think

    const collection = await dbService.getCollection('houses');
    //house.datePosted = new Date(); // optionally set on backend
    const result = await collection.insertOne(house);
    return { ...house, _id: result.insertedId };
}

async function update(id, house) {
    const collection = await dbService.getCollection('houses');
    const houseToSave = { ...house };
    delete houseToSave._id; // Mongo doesn't allow updating _id
    await collection.updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: houseToSave }
    );
    return { ...houseToSave, _id: id };
}

async function remove(id) {
    const collection = await dbService.getCollection('houses');
    await collection.deleteOne({ _id: new ObjectId(String(id)) });
}

