import adaptRequest from '../../helpers/adaptRequest.js';
import { sendResponse, success } from '../../helpers/responseHelper.js';
import authService from './authService.js';

const login = async (req, res) => {
  const client = adaptRequest(req);

  const loginResult = authService.login(client.body);

  sendResponse(res, loginResult);
};

export default { login };
