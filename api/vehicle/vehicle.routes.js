import express from 'express';

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { addVehicle, deleteVehicle, getVehicleById, getVehicles, updateVehicle } from './vehicle.controller.js';

const router = express.Router();

router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.post('/', addVehicle);
router.put('/:id', requireAuth, updateVehicle);
router.delete('/:id', requireAuth, deleteVehicle);

export const vehicleRoutes = router;
