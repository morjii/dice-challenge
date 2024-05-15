import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import pastryRoutes from './routes/pastryRoutes.js';
import winnersRoutes from './routes/winnersRoutes.js';

const app = express();
dotenv.config();

//mongoose.connect('mongodb://localhost:27017/challenge-dice-db')
mongoose.connect('mongodb://mongo:27017/challenge-dice-db')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Could not connect to MongoDB:', err);
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/', pastryRoutes);
app.use('/', winnersRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});