const express = require('express');
const router = express.Router();
const User = require('../model/user');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.put("/", upload.single('image'), async(rq,rs)=>{
    const update = await User.findByIdAndUpdate(rq.session._id, {pic: rq.file.path});
    rs.redirect('/');
});


module.exports = router;