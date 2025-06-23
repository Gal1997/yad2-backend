import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import { ObjectId } from 'mongodb'

export const userService = {
    query,
    getById,
    remove,
    save,
    getByEmail,
}

async function query() {
    try {
        const collection = await dbService.getCollection('users')
        const users = await collection.find().toArray()
        return users
    } catch (err) {
        loggerService.error('userService[query] :', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ _id: new ObjectId(String(userId)) })
        if (!user) throw `User not found by ID: ${userId}`
        return user
    } catch (err) {
        loggerService.error('userService[getById] :', err)
        throw err
    }
}

async function getByEmail(email) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        loggerService.error('userService[getByEmail] :', err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('users')
        const result = await collection.deleteOne({ _id: new ObjectId(String(userId)) })
        if (result.deletedCount === 0) throw `No user deleted with ID: ${userId}`
    } catch (err) {
        loggerService.error('userService[remove] :', err)
        throw err
    }
}

async function save(user) {
    try {
        const collection = await dbService.getCollection('users')

        // If user._id exists, it's an update
        if (user._id) {
            const id = user._id
            delete user._id
            await collection.updateOne(
                { _id: new ObjectId(String(id)) },
                { $set: user }
            )
            user._id = id
            return user
        } else {
            // New user
            const result = await collection.insertOne(user)
            user._id = result.insertedId
            return user
        }
    } catch (err) {
        loggerService.error('userService[save] :', err)
        throw err
    }
}
