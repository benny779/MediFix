import axios from 'axios';

const SERVER_PORT = 3005;
const SERVER_BASE_URL = `http://localhost:${SERVER_PORT}`;

const client = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5000,
});

export default client;
