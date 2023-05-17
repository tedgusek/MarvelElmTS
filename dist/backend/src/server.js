"use strict";
// import path from 'path';
// import express, { Request, Response, NextFunction } from 'express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const marvelController_1 = require("./controllers/marvelController");
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get('/api/characters', marvelController_1.marvelController);
// Error handling middleware
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map