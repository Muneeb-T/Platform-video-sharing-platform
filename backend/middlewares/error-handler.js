function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = status === 500 ? 'Internal server error' : err.message;
    res.status(status).json(message);
}
export default errorHandler;
