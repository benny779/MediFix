import Axios from 'axios';

function authRequestInterceptor(config) {
  config.headers.Accept = 'application/json';
  return config;
}

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_BASE_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

export default axios;
