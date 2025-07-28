import { dbService } from '../../services/db.service.js';
import { ObjectId } from 'mongodb';
import { loggerService } from '../../services/logger.service.js';

export const yad2Service = {
    query,
    getById,
    add,
    update,
    remove,
};

async function query() {
    const collection = await dbService.getCollection('yad2Item');
    loggerService.info(`yad2.service - fetched all items`);
    return await collection.find().toArray();
}

async function getById(id) {
    const collection = await dbService.getCollection('yad2Item');
    return await collection.findOne({ _id: new ObjectId(String(id)) });
}

async function add(item) {
    const collection = await dbService.getCollection('yad2Item');
    const ownerIdObj = new ObjectId(item.ownerId);
    const { _id, ownerId, ...rest } = item;

    const itemToInsert = {
        ownerId: ownerIdObj,
        datePosted: new Date(),
        ...rest
    };

    console.log("Item to insert is", itemToInsert);
    console.log('typeof datePosted:', typeof itemToInsert.datePosted); // should be 'object'
    console.log('instanceof Date:', itemToInsert.datePosted instanceof Date); // should be true



    try {
        await collection.insertOne(itemToInsert);
    } catch (err) {
        console.dir(err, { depth: null }); // more detailed error
    }

}

async function update(id, item) {
    const collection = await dbService.getCollection('yad2Item');
    const itemToSave = { ...item };
    delete itemToSave._id;
    await collection.updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: itemToSave }
    );
    return { ...itemToSave, _id: id };
}

async function remove(id) {
    const collection = await dbService.getCollection('yad2Item');
    await collection.deleteOne({ _id: new ObjectId(String(id)) });
}