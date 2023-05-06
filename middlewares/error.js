class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
  });
};

export default ErrorHandler;
