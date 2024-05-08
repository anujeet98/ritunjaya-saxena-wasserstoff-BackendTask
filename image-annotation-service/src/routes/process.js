
const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-s3');
const processController = require('../controllers/process');

router.post('/', multer.upload.single('image'), processController.process);


module.exports = router