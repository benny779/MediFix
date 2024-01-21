import adaptRequest from '../helpers/adaptRequest.js';
import { sendResponse, success } from '../helpers/responseHelper.js';

const getById = async (req, res) => {
  const client = adaptRequest(req);

  sendResponse(res, success(client))
};

export default { getById };
