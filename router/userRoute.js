const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

router.post('/', async(rq,rs)=>{
    const {username, password, firstName, lastName} = rq.body;
    const hashedpwd = await hashPassword(password);
    const user = await new User({username, password: hashedpwd,firstName,lastName});
    await user.save();
    rs.redirect('/');
});

const hashPassword = async(password)=>{
    const pwd = await bcrypt.hash(password,12);
    return pwd;
}

router.get('/', (rq,rs)=>{
    rs.render('signup');
})

module.exports = router;