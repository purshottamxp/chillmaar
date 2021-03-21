const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/', async(rq,rs)=>{
    const frnd = await User.findOne({"username": rq.body.username});
    const user = await User.findById(rq.session._id);
    rs.json({frnd, user});
    rs.end();
});

module.exports = router;