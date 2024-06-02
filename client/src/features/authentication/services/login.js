import { ENDPOINT, LOCAL_STORAGE_NAME } from '..';
import { apiClient } from '../../../api/apiClient';
import { jwtDecode } from 'jwt-decode';

const login = async (email, password) => {
  const res = await apiClient.post(`${ENDPOINT}/login`, { email, password });

  if (res.success) {
    const jwt = jwtDecode(res.data.accessToken);
    const user = {
      ...res.data,
      ...jwt,
    };
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));
  }

  return res;
};

export default login;
