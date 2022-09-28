// @ts-nocheck
import mongoose from 'mongoose';
function errorHandler(err, req, res, next) {
    
    let { message } = err;
    let status;

    if (err instanceof mongoose.Error.CastError) {
        const { errors } = err;
        const key = Object.keys(errors)[0];
        status = 400;
        message = `Enter valid ${key}`;
    }

    if (err instanceof mongoose.Error.ValidationError) {
        const { errors } = err;
        const key = Object.keys(errors)[0];
        status = 400;
        if (errors[key].name === 'CastError') {
            message = `Enter a valid ${key}`;
        } else {
            message = errors[key].message;
        }
    }

    status = status || 500;
    message = status === 500 ? 'Internal server error' : message;
    res.status(status).json({ success: false, message });
}
export default errorHandler;
