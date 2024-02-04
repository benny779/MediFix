import z from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

export const configSchema = z.object({
  SERVER_PORT: z.preprocess(
    (a) => (typeof a === 'string' ? parseInt(a) : a),
    z.number().int('Must be an integer').positive('Must be positive').default(3000)
  ),

  DB_HOST: z.string().min(1),
  DB_PORT: z.preprocess(
    (a) => (typeof a === 'string' ? parseInt(a) : a),
    z.number().int('Must be an integer').positive('Must be positive')
  ),
  DB_NAME: z.string().min(1),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),

  ACCESS_TOKEN_SECRET: z.string().min(10),
  ACCESS_TOKEN_EXPIRY: z.preprocess(
    (a) => (typeof a === 'string' ? parseInt(a) : a),
    z.number().int('Must be an integer').positive('Must be positive').default(900)
  ),
  REFRESH_TOKEN_SECRET: z.string().min(10),
  REFRESH_TOKEN_EXPIRY: z.preprocess(
    (a) => (typeof a === 'string' ? parseInt(a) : a),
    z.number().int('Must be an integer').positive('Must be positive').default(86400)
  ),
});

export const config = configSchema.parse(process.env);

export default config;
