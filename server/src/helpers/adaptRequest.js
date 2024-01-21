export const adaptRequest = (req = {}) => {
  return Object.freeze({
    path: req.path,
    routePath: req.originalUrl,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
  });
};

export default adaptRequest;
