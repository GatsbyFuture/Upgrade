const postService = require('../service/post.service')

class PostController {
    async create(req, res, next) {
        try {
            const newPost = await postService.create(req.body, req.files.picture, req.user.id);
            res.status(200).json({result: newPost});
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            console.log(req.requestTime);
            const allPost = await postService.getAll();
            res.status(200).json(allPost);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const result = await postService.delete(id);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {params, body} = req;
            const result = await postService.update(params.id, body);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const post = await postService.getOne(id);
            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PostController();