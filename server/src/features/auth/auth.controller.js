import adaptRequest from '../../helpers/adaptRequest.js';
import { sendResponse } from '../../helpers/responseHelper.js';
import authService from './auth.service.js';

const login = async (req, res) => {
  const client = adaptRequest(req);
  const { email, password } = client.body;

  const loginResult = await authService.login(email, password);

  sendResponse(res, loginResult);
};

const register = async (req, res) => {
  const client = adaptRequest(req);

  const registerResult = await authService.register(client.body);

  sendResponse(res, registerResult);
};

export default { login, register };
