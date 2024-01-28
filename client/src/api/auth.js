import client from './axios';

const login = async (loginDetails) => {
  return await client.post('auth/login', loginDetails);
};

export default login;
