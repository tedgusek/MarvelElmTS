import marvelController from './controllers/marvelController';
import { CustomResponse } from './types';
import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();
const PORT: number = 5173;

// Middleware
app.use(express.json() as NextFunction);
app.use(express.urlencoded({ extended: true }) as NextFunction);

// Routes
app.get('/characters', marvelController.getCharacters);

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.log(err.stack);
  (res as CustomResponse).status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
