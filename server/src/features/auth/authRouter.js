import express from 'express';
import authController from './authController.js';

const authRoute = express.Router();

authRoute.post('/login', authController.login);

export default authRoute;
