import adaptRequest from '../../helpers/adaptRequest.js';
import { sendResponse } from '../../helpers/responseHelper.js';
import authService from './auth.service.js';

const login = async (req, res) => {
  const client = adaptRequest(req);

  const loginResult = authService.login(client.body);

  sendResponse(res, loginResult);
};

export default { login };
