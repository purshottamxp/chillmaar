const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        story: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        },
        likes:{
            type: Number,
            default: 0
        },
        liked:[
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: false
            }
        ]
    }
);

module.exports = mongoose.model('post', postSchema);