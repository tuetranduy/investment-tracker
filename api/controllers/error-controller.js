const winston = require('../config/winston');

const errorHandler = function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500);
    res.send({
        message: {
            isSuccess: false,
            code: err.status || 500,
            error: err.message
        }
    });
};

module.exports = errorHandler;