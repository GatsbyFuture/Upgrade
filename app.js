// HTTP method - GET, POST, DELETE, PUT
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const authRoute = require('./routes/auth.route')
const postRoute = require('./routes/post.route');
const requestTime = require('./middlewares/request-time');

const app = express();

app.use(requestTime);
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));

// routes for post direct
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

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