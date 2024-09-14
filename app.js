// HTTP method - GET, POST, DELETE, PUT
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const app = express();
const postModel = require('./models/post.model')

app.use(express.json());
app.get('/', async (req, res) => {
    try {
        const Posts = await postModel.find();
        res.status(200).json({result: Posts});
    } catch (e) {
        res.status(500).json(e);
    }
});

app.post('/', async (req, res) => {
    try {
        const {title, body} = req.body;
        const newPost = await postModel.create({title, body});
        res.status(200).json({result: newPost});
    } catch (e) {
        res.status(500).json(e);
    }
})

app.delete('/:id', (req, res) => {
    const {id} = req.params;
    res.send(id);
});

app.put('/:id', (req, res) => {
    const {id} = req.params;
    const body = req.body;
    res.json({id: id, data: body});
})

const PORT = process.env.PORT || 8000;
const bootstrap = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then(() => console.log('connected db'));
        app.listen(PORT, () => console.log(`Listening 0n - http://localhost:${PORT}`));
    } catch (e) {
        console.log(`Error connecting with db:${e}`);
    }
}
bootstrap();