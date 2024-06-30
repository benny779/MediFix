import { useCallback } from 'react';
import useApiClient from '../../../api';
import { useAuthContext } from '../../../context/AuthContext';
import { ENDPOINT } from '..';

export function useAuth() {
  const apiClient = useApiClient();
  const { user, accessToken, refreshToken, setAuthInfo, clearAuthInfo, isLoading } =
    useAuthContext();

  const register = useCallback(
    async (registerObj) => {
      return await apiClient.post(`${ENDPOINT}/register`, registerObj);
    },
    [apiClient]
  );

  const login = useCallback(
    async (email, password) => {
      const { response, isSuccess, error } = await apiClient.post(`${ENDPOINT}/login`, {
        email,
        password,
      });

      if (isSuccess) {
        setAuthInfo(response);
      }

      return { isSuccess, error };
    },
    [apiClient, setAuthInfo]
  );

  const logout = useCallback(() => {
    clearAuthInfo();
  }, [clearAuthInfo]);

  const hasRole = useCallback(
    (role) => {
      return user?.roles?.includes(role);
    },
    [user]
  );

  return {
    user,
    accessToken,
    refreshToken,
    login,
    register,
    logout,
    hasRole,
    isLoading,
  };
}
