import { loggerService } from '../../services/logger.service.js';
import { houseService } from './house.service.js';

export async function getHouses(req, res) {
    try {
        loggerService.info("hiss")
        const houses = await houseService.query();


        res.json(houses);
    } catch (err) {
        res.status(500).send('Failed to get houses');
    }
}

export async function getHouseById(req, res) {
    try {
        const house = await houseService.getById(req.params.id);
        res.json(house);
    } catch (err) {
        res.status(500).send('Failed to get house');
    }
}

export async function addHouse(req, res) {
    try {
        const house = await houseService.add(req.body);
        res.json(house);
    } catch (err) {
        res.status(500).send('Failed to add house');
    }
}


export async function updateHouse(req, res) {
    try {
        const { id } = req.params;
        const house = await houseService.getById(id);

        if (!house) return res.status(404).send('House not found');
        if (house.ownerId !== req.loggedinUser._id) {
            return res.status(403).send('Not authorized to update this house');
        }

        const updatedHouse = await houseService.update(id, req.body);
        res.json(updatedHouse);
    } catch (err) {
        console.error('Failed to update house:', err);
        res.status(500).send('Failed to update house');
    }
}


export async function deleteHouse(req, res) {
    try {
        const { id } = req.params;
        const house = await houseService.getById(id);

        if (!house) return res.status(404).send('House not found');
        // The middleware put 'loggedinUser' on 'req' for us to use here
        if (house.ownerId !== req.loggedinUser._id) {
            return res.status(403).send('Not authorized to delete this house');
        }

        await houseService.remove(id);
        res.send({ msg: 'House deleted successfully' });
    } catch (err) {
        console.error('Failed to delete house:', err);
        res.status(500).send('Failed to delete house');
    }
}