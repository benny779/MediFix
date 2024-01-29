import apiClient from '../axios';

const login = async (email, password) => {
  return await apiClient().post('auth/login', { email, password });
};

export { login };
