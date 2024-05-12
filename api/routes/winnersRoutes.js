import express from 'express';
import Winner from '../models/winners.js';  // Assurez-vous que le chemin d'accès est correct
import Pastry from '../models/pastries.js';  // Pour la mise à jour des stocks si nécessaire

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

// Route pour enregistrer un nouveau gagnant
router.post('/register-winner', async (req, res) => {
  const { userId, pastryIds, date } = req.body;
  try {
    // Créer un nouvel enregistrement de gagnant
    const winner = new Winner({
      user: userId,
      pastries: pastryIds,
      winDate: date
    });

    // Sauvegarder le nouveau gagnant
    await winner.save();

    // Optionnellement, mettre à jour les stocks de pâtisseries
    pastryIds.forEach(async (pastryId) => {
      await Pastry.findByIdAndUpdate(pastryId, { $inc: { stock: -1 } });
    });

    res.status(201).json({ message: "Winner registered successfully", winner });
  } catch (error) {
    res.status(500).json({ message: "Error registering winner", error });
  }
});

export default router;