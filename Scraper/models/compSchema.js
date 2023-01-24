const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
    link: {
        type: String,
        require: true
    },
    discription: [String],
    actualPrice: String,
    priceData: [String],
    timeData: [String],
    offers: [String]
})


const compSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_obj'
    },
    title: {
        type: String,
    },
    notifyPrice: {
        type: String
    },
    url1: {
        type: urlSchema,
    },
    url2: {
        type: urlSchema,
    },
});

module.exports = mongoose.model('comp_obj', compSchema)