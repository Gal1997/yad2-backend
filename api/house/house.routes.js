import express from 'express';
import { addHouse, getHouses, getHouseById, updateHouse, deleteHouse } from './house.controller.js';
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router();

router.get('/', getHouses);
router.get('/:id', getHouseById);
router.post('/', addHouse);
router.put('/:id', requireAuth, updateHouse);
router.delete('/:id', requireAuth, deleteHouse);

export const houseRoutes = router;
