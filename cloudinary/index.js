const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.cName,
    api_key: process.env.cKey,
    api_secret: process.env.cSecret
});

const storage = new CloudinaryStorage({
    cloudinary,
    folder: "chillmaar",
    allowedFormats: ['jpeg','png','jpg']
});

module.exports= {
    cloudinary, storage
}