const express = require('express');
const router = express.Router();
const Post = require('../model/post');

router.put('/', async(rq,rs)=>{
    await Post.findByIdAndUpdate(rq.body.id, {$inc: {likes:1}, $push: {liked: rq.session._id}});
    rs.end();
});

module.exports = router;