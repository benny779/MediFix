const { config } = require('zod');
const dotenv = require('dotenv');

dotenv.config();

const envSchema = config({
  NODE_ENV: config.string(),
  PORT: config.string().default('3000'),
  MONGODB_URI: config.string(),
});

const validatedEnv = envSchema.parse(process.env);

module.exports = validatedEnv;