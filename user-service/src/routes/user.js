const express = require('express');
const userController = require('../controllers/user');
const validationMiddleware = require('../middlewares/input-validator');

const router = express.Router();

router.post('/signup', validationMiddleware.validate, userController.signup);
router.post('/signin', validationMiddleware.validate, userController.signin);


module.exports = router;