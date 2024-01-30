import { apiClient } from '../../api/apiClient';

const ENDPOINT = '/auth';

const login = async (email, password) => {
  return await apiClient.post(`${ENDPOINT}/login`, { email, password });
};

export { login };
