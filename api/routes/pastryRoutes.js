import express from 'express';
import Pastry from '../models/pastries.js';
const router = express.Router();


// Route pour obtenir le nombre total de pâtisseries restantes à gagner
router.get('/pastries-left', async (req, res) => {
  try {
    const pastries = await Pastry.find({});
    const totalLeft = pastries.reduce((acc, pastry) => acc + (pastry.stock || 0), 0);
    res.json({ totalLeft });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving pastries count", error });
  }
});

// // Route pour obtenir les images des pâtisseries disponibles
// router.get('/pastries-images', async (req, res) => {
//   try {
//     const pastries = await Pastry.find({});
//     const images = pastries.map(pastry => pastry.image).filter(image => image); // Supposer que chaque pâtisserie a un champ 'image'
//     res.json(images);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving pastry images", error });
//   }
// });

export default router;