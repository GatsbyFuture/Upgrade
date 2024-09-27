const postModel = require('../models/post.model');
const fileService = require('.//file.server');

class PostService {
    async create(post, picture, author) {
        const fileName = fileService.save(picture);
        const newPost = await postModel.create({...post, picture: fileName, author});
        return newPost;
    }

    async getAll() {
        const allPosts = await postModel.find();
        return allPosts;
    }

    async delete(id) {
        const result = await postModel.deleteOne({_id: id});
        return result;
    }

    async update(id, body) {
        if (!id) {
            throw new Error('Id not found');
        }

        const isPost = await this.getOne(id);
        if (!isPost) {
            throw new Error('Post with existing Id not found');
        }

        const updateData = await postModel.findByIdAndUpdate(id, body,
            {new: true}
        );

        return updateData;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Id not found');
        }
        const post = await postModel.findById(id);
        return post;
    }
}

module.exports = new PostService();