import axios from './axios';

const sendRequest = async (request) => {
  try {
    const { data } = await request();
    return data;
  } catch (error) {
    const errorResponse = error.response?.data || {
      success: false,
      error: {
        message: 'Server unavailable',
      },
    };

    errorResponse.statusCode = error.response?.status || 500;
    return errorResponse;
  }
};

export const apiClient = {
  get: (route, params) => sendRequest(() => axios.get(route, { params })),
  post: (route, data) => sendRequest(() => axios.post(route, data)),
  put: (route, data) => sendRequest(() => axios.put(route, data)),
  patch: (route, data) => sendRequest(() => axios.patch(route, data)),
  delete: (route) => sendRequest(() => axios.delete(route)),
};
