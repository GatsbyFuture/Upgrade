const BaseError = require('../errors/base.error');
const tokenService = require('../service/token.service');
module.exports = function (req, res, next) {
    try {
        const authrization = req.headers.authorization;
        if (!authrization) {
            return next(BaseError.UnauthorizedError());
        }

        const accessToken = authrization.split(' ')[1];
        if (!accessToken) {
            return next(BaseError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(BaseError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(BaseError.UnauthorizedError());
    }
};