const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const {v4: uuidV4} = require('uuid');

AWS.config.update({
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
});
const awsS3 = new AWS.S3();


const fileFilterHandler = (req, file, cb) => {
    if(!file)
        return cb(new Error('Invalid file recieved'));
    if(!['image/jpeg', 'image/png'].includes(file.mimetype))
        return cb(new Error('Invalid file type. Only JPEG, PNG allowed.'));
    // Validation passed
    cb(null, true);
}

// Multer middleware configuration
module.exports.upload = multer({
    storage: multerS3({
        s3: awsS3,
        bucket: process.env.AWS_S3_BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `${uuidV4()}.${file.mimetype.split('/')[1]}`);
        },
    }),
    fileFilter: fileFilterHandler,
    onError: function(err, next) {
        console.error('Multer error:', err);
        next(err); // Pass the error to the next middleware
    }
});
