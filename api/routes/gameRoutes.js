import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import gameUtils from '../utils/gameUtils.js';
import User from '../models/users.js';
import Pastry from '../models/pastries.js'; // Ensure you have this import to access the Pastry model
import Winner from '../models/winners.js';

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

        // enlever les chances si gagnant

        if(result.pastriesWon > 0) {
            user.chancesLeft = 0;
            await user.save();
        }

        // attribuer les pastries de manière aléatoire 

     

        // ajout user dans winner si gagnant
        async function selectRandomPastry(result) {
            const pastries = await Pastry.find();
            let pastriesInStock = pastries.filter(pastry => pastry.stock > 0);
        
            if (pastriesInStock.length === 0) {
                return [];
            }
        
            let pastriesSelected = [];
            while (result.pastriesWon > 0 && pastriesInStock.length > 0) {
                const randomIndex = Math.floor(Math.random() * pastriesInStock.length);
                const selectedPastry = pastriesInStock[randomIndex];
                selectedPastry.stock--;
                selectedPastry.quantityWon++
                await selectedPastry.save();
        
                pastriesSelected.push(selectedPastry);
                result.pastriesWon--;
        
                // Refresh the list of pastries in stock
                pastriesInStock = pastriesInStock.filter(pastry => pastry.stock > 0);
            }
        
            return pastriesSelected;
        }


        const pastriesSelected = await selectRandomPastry(result);

if (pastriesSelected.length > 0) {
    const winner = await Winner.create({
        userName: user.name,
        pastry: pastriesSelected.map(pastry => pastry.name),
        date: new Date(),
        number: pastriesSelected.length
    });
}

        
        res.json({
            status: 'success',
            dices: dices,
            result: result.win,
            pastriesWon: pastriesSelected.length,
            chancesLeft: user.chancesLeft,
            pastriesDetails: pastriesSelected
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

// check de la fin du jeu
router.get('/check-game-end', async (req, res) => {
    const totalStock = await Pastry.aggregate([{ $group: { _id: null, total: { $sum: "$stock" } } }]);
    if (totalStock[0].total <= 0) {
        res.json({ gameEnded: true });
    } else {
        res.json({ gameEnded: false });
    }
});

export default router;