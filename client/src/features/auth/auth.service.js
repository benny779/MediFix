import { apiClient } from '../../api/apiClient';

const ENDPOINT = '/auth';
const LOCAL_STORAGE_NAME = 'user';

const login = async (email, password) => {
  const res = await apiClient.post(`${ENDPOINT}/login`, { email, password });

  if (res.success) {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(res.data));
  }

  return res;
};

const logout = () => localStorage.removeItem(LOCAL_STORAGE_NAME);

const getCurrentUser = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

export { login, logout, getCurrentUser };
