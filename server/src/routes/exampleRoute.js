import express from 'express';
import exampleController from '../controllers/exampleController.js';

const exampleRoute = express.Router();

exampleRoute.get('/:id', exampleController.getById);
exampleRoute.get('/');
exampleRoute.put('/:id');
exampleRoute.post('/');
exampleRoute.delete('/:id');

export default exampleRoute;
