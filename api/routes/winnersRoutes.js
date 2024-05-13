import express from 'express';
import Winner from '../models/winners.js';
import Pastry from '../models/pastries.js';

const router = express.Router();

// Route pour obtenir la liste de tous les gagnants
router.get('/winners', async (req, res) => {
    try {
        const winners = await Winner.find({}).populate('pastries');
        res.json(winners);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving winners", error });
    }
});

// Route pour enregistrer un nouveau gagnant et mettre à jour les stocks de pâtisseries
router.post('/register-winner', async (req, res) => {
    const { userId, pastryIds, date } = req.body;
    try {
        // Vérifiez d'abord si suffisamment de stock est disponible pour chaque pâtisserie
        for (const pastryId of pastryIds) {
            const pastry = await Pastry.findById(pastryId);
            if (!pastry || pastry.stock < 1) {
                throw new Error(`Not enough stock for pastry with ID ${pastryId}`);
            }
        }

        // Créer un nouvel enregistrement de gagnant
        const winner = new Winner({
            user: userId,
            pastries: pastryIds,
            winDate: date
        });

        // Sauvegarder le nouveau gagnant
        await winner.save();

        // Mettre à jour les stocks de pâtisseries
        for (const pastryId of pastryIds) {
            await Pastry.findByIdAndUpdate(pastryId, { $inc: { stock: -1 } });
        }

        res.status(201).json({ message: "Winner registered successfully", winner });
    } catch (error) {
        res.status(500).json({ message: "Error registering winner", error: error.message });
    }
});

export default router;


