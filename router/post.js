const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const User = require('../model/user');

router.post('/', async(rq,rs)=>{
    const user = await User.findById(rq.session._id);
    const fullName = user.firstName +" "+ user.lastName;
    const msg = rq.body.story;
    const post = await new Post({story:msg, fullname:fullName});
    user.posts.push(post);
    await post.save();
    await user.save();
    rs.redirect('/');
});


module.exports = router;