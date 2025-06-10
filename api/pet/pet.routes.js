import express from 'express'
import { getPets } from './pet.controller.js'
// import { getUser, getUsers, deleteUser, updateUser } from './user.controller.js'
const router = express.Router()

router.get('/', getPets)
// router.get('/:id', getUser)
// router.put('/:id', updateUser)
// router.delete('/:id', deleteUser)

export const petRoutes = router