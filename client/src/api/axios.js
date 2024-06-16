import Axios from 'axios';
import { useAuth } from '../features/authentication';
import { useEffect } from 'react';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_BASE_URL,
  headers: { Accept: 'application/json' },
});

export const useAxios = () => {
  const { user, refresh } = useAuth();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization'] && user?.accessToken) {
          config.headers.Authorization = 'Bearer ' + user.accessToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const refreshResponse = await refresh();
          prevRequest.headers.Authorization = `Bearer ${refreshResponse.accessToken}`;
          return axios(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axios;
};
