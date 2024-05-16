import express from 'express';
import Winner from '../models/winners.js';


const router = express.Router();

// recupère et renvoie la liste de tous les gagnants
router.get('/board', async (req, res) => {
    try {
        const winners = await Winner.find();
        res.json(winners);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving winners", error });
    }
});




export default router;


