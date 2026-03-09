import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'; // <-- 1. Import new routes

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // <-- 2. Mount user routes

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'SkillSwap API is running!' });
});

export default app;