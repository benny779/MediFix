import adaptRequest from './adaptRequest.js';

const success = (data = null) => {
  return {
    success: true,
    status: 200,
    data,
  };
};

const created = (data = null) => {
  return {
    success: true,
    status: 201,
    data,
  };
};

const deleted = (message = 'Deleted') => {
  return {
    success: true,
    status: 204,
    message,
  };
};

const badRequest = (message = 'Bad Request ') => {
  return {
    success: false,
    status: 400,
    error: {
      message,
    },
  };
};

const unauthorized = (message = 'Unauthorized ') => {
  return {
    success: false,
    status: 401,
    error: {
      message,
    },
  };
};

const notFound = (message = 'Not Found') => {
  return {
    success: false,
    status: 404,
    error: {
      message,
    },
  };
};

const error = (message = 'Internal Server Error') => {
  return {
    success: false,
    status: 500,
    error: {
      message,
    },
  };
};

const sendResponse = (res, result) => {
  const { status, ...response } = result;
  res.status(status).json(response);
};

export {
  success,
  created,
  deleted,
  badRequest,
  unauthorized,
  notFound,
  error,
  sendResponse,
  adaptRequest,
};
