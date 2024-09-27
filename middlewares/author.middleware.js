const BaseError = require('../errors/base.error');
const postModule = require('../models/post.model');
module.exports = async function (req, res, next) {
    try {
        const post = await postModule.findById(req.params.id);
        const authorId = req.user.id;
        if (post.author !== authorId) {
            return next(BaseError.BadRequest('Only author can edit this post'));
        }
        next();
    } catch (e) {
        return next(BaseError.BadRequest('Only author can edit this post'));
    }
}