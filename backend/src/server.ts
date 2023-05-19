import marvelController from './controllers/marvelController';
import { CustomResponse } from './types';
import express, { Express, Request, Response, NextFunction } from 'express';
// import path from 'path';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app: Express = express();
const PORT: number = 5173;

// app.use(express.static(path.resolve(__dirname, '../../frontend/src')));
// app.use(express.static(path.resolve(__dirname, '../../frontend/src')));

// Middleware
app.use(express.json() as NextFunction);
app.use(express.urlencoded({ extended: true }) as NextFunction);

// Routes
app.get('/characters', marvelController.getCharacters);

// Error handling middleware
//need to rework this
// app.use((err: any, req: Request, res: Response) => {
//   // console.log(err.stack);
//   (res as CustomResponse).status(500).json({ error: 'Internal Server Error' });
//   // return;
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
