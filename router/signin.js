const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

router.post('/', async(rq,rs)=>{
    try{
        const {username, password} = rq.body;
        const user = await User.findOne({username});
            const result = await bcrypt.compare(password, user.password);
            if(result){
                rq.session.username = user.username;
                rq.session._id = user.id;
                rq.session.fname = user.firstName;
                rq.session.lname = user.lastName;
                rs.redirect('/');
            }
    }catch(e){
        rq.flash('error','Username or password is incorrect');
        rs.redirect('/');
    }
});


module.exports = router;