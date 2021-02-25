const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

router.post('/', async(rq,rs)=>{
    const {username, password} = rq.body;
    const user = await User.findOne({username});
    const result = await bcrypt.compare(password, user.password);
    if(result){
        rq.session.username = user.username;
        rs.redirect('/');
    }
});


module.exports = router;