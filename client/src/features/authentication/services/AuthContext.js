import useApiClient from '../../../api';
import { ENDPOINT, LOCAL_STORAGE_NAME } from '..';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || {});
  const { post, error, isLoading } = useApiClient();

  const register = async (registerObj) => {
    return await post(`${ENDPOINT}/register`, registerObj);
  };

  const login = async (email, password) => {
    const { response, isSuccess } = await post(`${ENDPOINT}/login`, { email, password });

    if (isSuccess) {
      const jwt = jwtDecode(response.accessToken);
      const userData = {
        ...response,
        ...jwt,
      };

      setUser(userData);
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(userData));
    }

    return { isSuccess };
  };

  const logout = () => {
    setUser({});
    localStorage.removeItem(LOCAL_STORAGE_NAME);
  };

  const refresh = async () => {
    const { accessToken, refreshToken } = user;
    const { isSuccess, response } = await post(`${ENDPOINT}/refresh`, {
      accessToken,
      refreshToken,
    });

    if (!isSuccess) {
      return {};
    }

    const jwt = jwtDecode(response.accessToken);
    const userData = {
      ...response,
      ...jwt,
    };

    setUser(userData);
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(userData));

    return userData;
  };

  const isTokenActive = () => {
    if (!user.accessToken) {
      return false;
    }

    const nowUnix = Math.floor(new Date().getTime() / 1000);

    return user.exp > nowUnix;
  };

  useEffect(() => {
    if (!user.accessToken) return;

    const expirationTime = user.exp * 1000 - 60000; // 1 minute before expiry
    const timeoutId = setTimeout(refresh, expirationTime - Date.now());

    return () => clearTimeout(timeoutId);
  }, [user.accessToken, user.exp]);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        refresh,
        user,
        setUser,
        isTokenActive: isTokenActive(),
        error,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
