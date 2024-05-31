import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/roomRoutes';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import usersRoutes from './routes/usersRoutes'; 
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger'; 
import feedBackRoutes from './routes/feedBackRoutes';// Import the function
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err  => console.error('Database connection error:', err));

//use cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', usersRoutes);
app.use('/api', feedBackRoutes);
app.use('/api', jobRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Your Server is running on port ${PORT}`);
});

export default app;