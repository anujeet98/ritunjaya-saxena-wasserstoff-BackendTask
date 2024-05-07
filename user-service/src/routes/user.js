const express = require('express');
require('')


const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);


module.exports = router;