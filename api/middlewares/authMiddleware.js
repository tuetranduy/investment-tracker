const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/index');

function verifyToken(req, res, next) {
    let token = req.headers['access_token'] ? req.headers['access_token'].toString() : undefined;
    console.log('verifyToken -> token', token);
    if (!token) {
        return res.status(403).send({ success: false, message: 'Access Denied for this request' });
    }

    jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.status(500).send({ success: false, message: `Failed to authenticate. Error: ${err}` });
        }

        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
