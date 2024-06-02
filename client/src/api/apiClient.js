import axios from './axios';

const sendRequest = async (request) => {
  try {
    const { data } = await request();
    return { success: true, data };
  } catch (error) {
    const statusCode = error.response?.status || 500;

    const errorResponse = {
      error: {
        detail: statusCode === 400 ? 'Validation error' : 'Server unavailable',
        ...error.response?.data,
      },
    };

    errorResponse.success = false;
    errorResponse.statusCode = statusCode;

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
