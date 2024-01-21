import express from 'express';
import { success, notFound } from '../helpers/responseHelper.js';
import exampleRoute from './exampleRoute.js';

const routes = express.Router();

routes.use('/example', exampleRoute)

routes.use('/', async (req, res) => res.json(success('Hello World!')));

routes.use((req, res) => {
  res.status(404).json(notFound());
});

export default routes;
