import { loggerService } from '../../services/logger.service.js';
import { yad2Service } from './yad2.service.js';

export async function getYad2Items(req, res) {
    try {
        const items = await yad2Service.query();
        res.json(items);
    } catch (err) {
        res.status(500).send('Failed to get items');
    }
}

export async function getYad2ItemById(req, res) {
    try {
        const item = await yad2Service.getById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(500).send('Failed to get item');
    }
}

export async function addYad2Item(req, res) {
    try {
        const item = await yad2Service.add(req.body);
        res.json(item);
    } catch (err) {
        res.status(500).send('Failed to add item');
    }
}

export async function updateYad2Item(req, res) {
    try {
        const { id } = req.params;
        const item = await yad2Service.getById(id);

        if (!item) return res.status(404).send('Item not found');
        if (item.ownerId !== req.loggedinUser._id) {
            return res.status(403).send('Not authorized to update this item');
        }

        const updatedItem = await yad2Service.update(id, req.body);
        res.json(updatedItem);
    } catch (err) {
        console.error('Failed to update item:', err);
        res.status(500).send('Failed to update item');
    }
}

export async function deleteYad2Item(req, res) {
    try {
        const { id } = req.params;
        const item = await yad2Service.getById(id);

        if (!item) return res.status(404).send('Item not found');
        if (item.ownerId !== req.loggedinUser._id) {
            return res.status(403).send('Not authorized to delete this item');
        }

        await yad2Service.remove(id);
        res.send({ msg: 'Item deleted successfully' });
    } catch (err) {
        console.error('Failed to delete item:', err);
        res.status(500).send('Failed to delete item');
    }
}