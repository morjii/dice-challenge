import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import gameUtils from '../utils/gameUtils.js';
import User from '../models/users.js';

dotenv.config()

const router = Router();
const { rollDices, evaluateDices } = gameUtils;

// Route pour lancer les dés
router.get('/roll-dices', async (req, res) => {
const token = req.headers['x-access-token'];

try {
const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
const userId = decodedToken.userId;

const user = await User.findById(userId);
if (!user) {
return res.status(404).json({ status: 'error', message: 'User not found' });
}

if (user.chancesLeft <= 0) {
return res.status(400).json({
status: 'error',
message: 'No more chances left to play.'
});
}

// Décrémenter les chances restantes
user.chancesLeft -= 1;
await user.save();

const dices = rollDices();
const result = evaluateDices(dices);

res.json({
status: 'success',
dices: dices,
result: result.win,
pastriesWon: result.pastriesWon,
chancesLeft: user.chancesLeft
// Include the remaining chances in the response
});
} catch (error) {
console.log(error);
if (error.name === 'TokenExpiredError') {
res.status(401).json({ status: 'error', message: 'Token expired' });
} else {
res.status(500).json({
status: 'error',
message: 'An error occurred while rolling the dices.'
});
}
}
});

export default router;