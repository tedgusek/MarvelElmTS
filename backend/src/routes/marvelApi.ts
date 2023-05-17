// const express = require('express');

// const marvelController = require('../controllers/marvelController');

// const router = express.Router();

// router.get('/', marvelController.getCharachters, (req, res) =>
//   res.status(200).json(res.locals.data)
// );

// module.exports = router;
import express, { Request, Response, Router } from 'express';
// import { RequestHandler } from 'express-serve-static-core';

// import { marvelController } from '../controllers/marvelController';
import marvelController from '../controllers/marvelController';

const router: Router = express.Router();

router.get(
  '/characters',
  marvelController.getCharacters
  // (req: Request, res: Response) => res.status(200).json(res.locals.data)
);

export default router;
