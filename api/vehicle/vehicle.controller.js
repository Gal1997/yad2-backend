import { loggerService } from '../../services/logger.service.js';
import { vehicleService } from './vehicle.service.js';

export async function getVehicles(req, res) {
    try {
        const vehicles = await vehicleService.query();
        res.json(vehicles);
    } catch (err) {
        res.status(500).send('Failed to get vehicles');
    }
}

export async function getVehicleById(req, res) {
    try {
        const vehicle = await vehicleService.getById(req.params.id);
        res.json(vehicle);
    } catch (err) {
        res.status(500).send('Failed to get vehicle');
    }
}

export async function addVehicle(req, res) {
    try {
        const vehicle = await vehicleService.add(req.body);
        res.json(vehicle);
    } catch (err) {
        res.status(500).send('Failed to add vehicle');
    }
}


export async function updateVehicle(req, res) {
    try {
        const { id } = req.params;
        const vehicle = await vehicleService.getById(id);
        s
        if (!vehicle) return res.status(404).send('Vehicle not found');
        if (vehicle.ownerId !== req.loggedinUser._id) {
            return res.status(403).send('Not authorized to update this vehicle');
        }

        const updatedVehicle = await vehicleService.update(id, req.body);
        res.json(updatedVehicle);
    } catch (err) {
        console.error('Failed to update vehicle:', err);
        res.status(500).send('Failed to update vehicle');
    }
}


export async function deleteVehicle(req, res) {
    try {
        const { id } = req.params;
        const vehicle = await vehicleService.getById(id);

        if (!vehicle) return res.status(404).send('Vehicle not found');
        // The middleware put 'loggedinUser' on 'req' for us to use here
        if (vehicle.ownerId !== req.loggedinUser._id) {
            return res.status(403).send('Not authorized to delete this vehicle');
        }

        await vehicleService.remove(id);
        res.send({ msg: 'Vehicle deleted successfully' });
    } catch (err) {
        console.error('Failed to delete vehicle:', err);
        res.status(500).send('Failed to delete vehicle');
    }
}