const {Schema, model} = require('mongoose');

const TokenSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    refreshToken: {
        type: String,
        require: true
    }
});

module.exports = model('Token', TokenSchema);
