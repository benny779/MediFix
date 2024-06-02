import { ENDPOINT } from "..";
import { apiClient } from "../../../api/apiClient";

const register = async (registerObj) => {
  const res = await apiClient.post(`${ENDPOINT}/register`, registerObj);

  return res;
};

export default register;
