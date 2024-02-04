import jwt from 'jsonwebtoken';
import config from '../config.js';
import { unauthorized } from './responseHelper.js';

export const generateToken = (data, isAccessToken = true) => {
  const secret = isAccessToken ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;
  const expiry = isAccessToken ? config.ACCESS_TOKEN_EXPIRY : config.REFRESH_TOKEN_EXPIRY;

  return jwt.sign(data, secret, { expiresIn: expiry });
};

export const validateToken = (token, isAccessToken = true) => {
  const secret = isAccessToken ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return unauthorized(error.message);
  }
};
