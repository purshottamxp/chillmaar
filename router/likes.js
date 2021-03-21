const express = require('express');
const router = express.Router();
const Post = require('../model/post');

router.post('/', async(rq,rs)=>{
    const post = await Post.findById(rq.body.id);
    rq.session.postID = rq.body.id;
    post.likes += await 1;
    post.save();
    rs.redirect('/');
});

router.get('/', async(rq,rs)=>{
    const post = await Post.findById(rq.session.postID);
    await post.liked.push(rq.session._id);
    post.save();
    rs.redirect('/');
});


module.exports = router;