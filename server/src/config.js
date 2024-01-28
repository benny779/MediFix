import z from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

export const configSchema = z.object({
  SERVER_PORT: z.preprocess(
    (a) => (typeof a === 'string' ? parseInt(a) : a),
    z.number().int('Must be an integer').positive('Must be positive').default(3005)
  ),
  MONGODB_URI: z.string().min(0).default(''),
});

export const config = configSchema.parse(process.env);

export default config;
