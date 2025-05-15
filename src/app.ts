import express from 'express';
import itemRoutes from './routes/itemRoutes.ts';
import authRoutes from './routes/authRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/items', itemRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.use(errorHandler);

export default app;
