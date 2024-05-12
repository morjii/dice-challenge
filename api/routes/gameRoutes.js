import { Router } from 'express';
const router = Router();
import gameUtils from '../utils/gameUtils.js';

const { rollDices, evaluateDices } = gameUtils;

// Route pour lancer les dés
router.post('/roll-dices', (req, res) => {
  try {
    const dices = rollDices();
    const result = evaluateDices(dices);
    res.json({
      status: 'success',
      dices: dices,
      result: result.win,
      pastriesWon: result.pastriesWon
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while rolling the dices.'
    });
  }
});

// Exporter le router
export default router;
