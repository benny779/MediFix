export const errorHandler = (err, req, res, next) => {
  const { status, message } = err;

  res.status(status).json({
    message,
    timestamp: Date.now(),
    path: req.originalUrl,
  });
};

export default errorHandler;
