import express from 'express';

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { addYad2Item, deleteYad2Item, getYad2ItemById, getYad2Items, updateYad2Item } from './yad2.controller.js';

const router = express.Router();

router.get('/', getYad2Items);
router.get('/:id', getYad2ItemById);
router.post('/', addYad2Item);
router.put('/:id', requireAuth, updateYad2Item);
router.delete('/:id', requireAuth, deleteYad2Item);

export const yad2Routes = router;