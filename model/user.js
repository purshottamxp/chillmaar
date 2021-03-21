const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true 
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        pic:{
            type: String,
            required: false,
            default: "https://res.cloudinary.com/purshottamxp/image/upload/v1616246732/kaz6zy1zak3hjwvfzsdf.png"
        },
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'post'
        }],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: false
            }
        ]
    }
);

module.exports = mongoose.model('user',userSchema);