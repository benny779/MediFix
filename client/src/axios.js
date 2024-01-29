import axios from 'axios';

const SERVER_PORT = 3000;
const SERVER_BASE_URL = `http://localhost:${SERVER_PORT}/api`;

const apiClient = () => {
  const axiosClient = axios.create({
    baseURL: SERVER_BASE_URL,
    timeout: 5000,
  });

  return {
    get(url, params) {
      return axiosClient
        .get(url, { params })
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          return err.response.data;
        });
    },

    post(url, data) {
      return axiosClient
        .post(url, data)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          return err.response.data;
        });
    },

    put(url, data) {
      return axiosClient
        .put(url, data)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          return err.response.data;
        });
    },

    delete(url) {
      return axiosClient
        .delete(url)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          return err.response.data;
        });
    },
  };
};

export default apiClient;
