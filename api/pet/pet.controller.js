import { petService } from "./pet.service.js"

export async function getPets(req, res) {
    try {
        const pets = await petService.query();
        res.json(pets)
    } catch (error) {
        res.status(500).send({ error: 'Failed to get pets' })
    }
}