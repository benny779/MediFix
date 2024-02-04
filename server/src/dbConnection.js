import mysql from 'mysql2';
import config from './config.js';

const connection = () => {
  return mysql.createPool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_NAME,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
  });
};

export default connection().promise();
