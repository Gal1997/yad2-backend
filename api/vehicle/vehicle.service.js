import { dbService } from '../../services/db.service.js';
import { ObjectId } from 'mongodb';
import { loggerService } from '../../services/logger.service.js';

export const vehicleService = {
    query,
    getById,
    add,
};

async function query() {
    const collection = await dbService.getCollection('vehicles');
    loggerService.info(`vehicle.service - fetched all vehicle`);
    return await collection.find().toArray();
}

async function getById(id) {
    const collection = await dbService.getCollection('vehicles');
    return await collection.findOne({ _id: new ObjectId(String(id)) });
}



async function add(vehicle) {
    const collection = await dbService.getCollection('vehicles');

    // convert the ownerId into a real ObjectId
    const ownerIdObj = new ObjectId(vehicle.ownerId);

    // strip out any stray _id
    const { _id, ownerId, ...rest } = vehicle;

    const result = await collection.insertOne({
        ownerId: ownerIdObj,
        ...rest
    });

    return { ...rest, ownerId: ownerIdObj, _id: result.insertedId };
}

async function update(id, vehicle) {
    const collection = await dbService.getCollection('vehicles');
    const vehicleToSave = { ...vehicle };
    delete vehicleToSave._id; // Mongo doesn't allow updating _id
    await collection.updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: vehicleToSave }
    );
    return { ...vehicleToSave, _id: id };
}

async function remove(id) {
    const collection = await dbService.getCollection('vehicles');
    await collection.deleteOne({ _id: new ObjectId(String(id)) });
}

