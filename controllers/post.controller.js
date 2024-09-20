const postService = require('../server/post.service')

class PostController {
    async create(req, res) {
        try {
            const newPost = await postService.create(req.body, req.files.picture);
            res.status(200).json({result: newPost});
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            console.log(req.requestTime);
            const allPost = await postService.getAll();
            res.status(200).json(allPost);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            const result = await postService.delete(id);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const {params, body} = req;
            const result = await postService.update(params.id, body);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const post = await postService.getOne(id);
            res.status(200).json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new PostController();