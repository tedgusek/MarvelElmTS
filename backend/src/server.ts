// import path from 'path';
// import express, { Request, Response, NextFunction } from 'express';

// const app = express();
// const PORT = 3000;

// import apiRouter from './routes/api';

// /**
//  * handle parsing request body
//  */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /**
//  * handle requests for static files
//  */
// app.use(express.static(path.resolve(__dirname, '../../frontend/src')));

// /**
//  * define route handlers
//  */
// app.use('/api', apiRouter);

// // catch-all route handler for any requests to an unknown route
// app.use((req: Request, res: Response) =>
//   res.status(404).send("This is not the page you're looking for...")
// );

// /**
//  * express error handler
//  * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
//  */
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = { ...defaultErr, ...err };
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// /**
//  * start server
//  */
// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}...`);
// });

// export default app;
import express, { Express, Request, Response, NextFunction } from 'express';
// import { getCharacters } from './controllers/marvelController';
import marvelController from './controllers/marvelController';

interface CustomResponse extends Response {
  status(code: number): CustomResponse;
  json(data: any): CustomResponse;
}

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
