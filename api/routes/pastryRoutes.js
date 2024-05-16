import express from 'express';
import Pastry from '../models/pastries.js';
const router = express.Router();


// calcule et renvoie le nb total de patisserie en stock
router.get('/pastries-left', async (req, res) => {
  try {
    const pastries = await Pastry.find({});
    const totalLeft = pastries.reduce((acc, pastry) => acc + (pastry.stock || 0), 0);
    res.json({ totalLeft });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving pastries count", error });
  }
});

export default router;