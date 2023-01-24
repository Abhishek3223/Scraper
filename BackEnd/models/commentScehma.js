const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentScehma = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_obj'
    },
    userName: {
        type: String,
    },
    message: {
        type: String,
    },
    date: {
        type: String,
    }
});

module.exports = mongoose.model('comment_obj', commentScehma)