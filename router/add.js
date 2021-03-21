const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/', async(rq,rs)=>{
    const user = await User.findById(rq.session._id);
    user.friends.push(rq.body.id);
    await user.save();
    rs.send(user);
});

module.exports = router;