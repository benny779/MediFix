import express from 'express';
import authController from './auth.controller.js';

const authRoute = express.Router();

authRoute.post('/login', authController.login);
authRoute.post('/register', authController.register);

export default authRoute;
