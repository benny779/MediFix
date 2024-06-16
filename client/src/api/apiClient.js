import { useEffect, useState } from 'react';
import { useAxios } from './axios';
import Axios from 'axios';

const useApiClient = () => {
  const axios = useAxios();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let controller = new AbortController();

  useEffect(() => {
    return () => controller?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendRequest = async ({ url, method, data = {}, params = {} }) => {
    setIsLoading(true);

    controller.abort();
    controller = new AbortController();

    try {
      const result = await axios({ url, method, data, params, signal: controller.signal });

      setResponse(result.data);
      setIsSuccess(true);

      return { response: result.data, error: null, isSuccess: true, isLoading };
    } catch (ex) {
      if (Axios.isCancel(ex)) {
        console.error(ex.message);
      } else {
        const errorResponse = ex.response?.data || {
          status: ex.response?.status || 500,
          detail:
            ex.response?.detail || (ex.response?.status === 400 ? 'Validation error' : ex.message),
        };

        setError(errorResponse);

        return { response: null, error: errorResponse, isSuccess: false, isLoading };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const apiClient = {
    get: (url, params) => sendRequest({ method: 'GET', url, params }),
    post: (url, data) => sendRequest({ method: 'POST', url, data }),
    put: (url, data) => sendRequest({ method: 'PUT', url, data }),
    patch: (url, data) => sendRequest({ method: 'PATCH', url, data }),
    delete: (url, data) => sendRequest({ method: 'DELETE', url, data }),
    response,
    error,
    isSuccess,
    isLoading,
  };

  return apiClient;
};

export default useApiClient;
