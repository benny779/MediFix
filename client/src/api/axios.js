import Axios from 'axios';
import { getCurrentUser } from '../features/auth/auth.service';

function getAuthHeader() {
  const currentUser = getCurrentUser();

  return currentUser ? { Authorization: 'Bearer ' + currentUser.user.accessToken } : {};
}

function authRequestInterceptor(config) {
  config.headers.Accept = 'application/json';

  const token = getAuthHeader().Authorization;
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
}

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_BASE_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

export default axios;
