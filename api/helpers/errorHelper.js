class ErrorHelper {
    permissionInsufficient(req, res, next, message) {
        return res.status(403).send({
            success: false,
            message
        })
    };

    badRequest(req, res, next, message) {
        return res.status(400).send({
            success: false,
            message
        })
    };

    requestProcessError(req, res, next, message) {
        return res.status(500).send({
            success: false,
            message
        })
    };
};

const errorHelper = new ErrorHelper;

module.exports = errorHelper;