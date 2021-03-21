const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/', async(rq,rs)=>{
    rq.session.username = null;
    rs.redirect('/');
});


module.exports = router;