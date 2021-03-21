const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

router.post('/', async(rq,rs)=>{
    try{
        const {username, password, firstName, lastName} = rq.body;
        const hashedpwd = await hashPassword(password);
        const user = await new User({username, password: hashedpwd,firstName,lastName});
        await user.save();
        rq.flash('success', 'Signup Successfully. Please login');
        rs.redirect('/');  
    }catch(e){
        if(rq.body.username === e.keyValue.username){
            rq.flash('error', `Username: ${rq.body.username} already exists.`);
        }
        rs.redirect('/signup');
    }
  
});

const hashPassword = async(password)=>{
    const pwd = await bcrypt.hash(password,12);
    return pwd;
}

router.get('/', (rq,rs)=>{
    rs.render('signup');
})

module.exports = router;