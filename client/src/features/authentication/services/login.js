import { ENDPOINT, LOCAL_STORAGE_NAME } from "..";
import { apiClient } from "../../../api/apiClient";

const login = async (email, password) => {
  const res = await apiClient.post(`${ENDPOINT}/login`, { email, password });

  if (res.success) {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(res.data));
  }

  return res;
};

export default login;
