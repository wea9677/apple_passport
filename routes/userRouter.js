require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authMiddleware = require('../middlewares/auth-middleware');
// const User = require('../models/user');
const router = express.Router();
const {
    appleCallback,
    checkMe
} = require('../controller/userController');


//애플 로그인

router.get('/login', appleCallback );

router.post('/auth/apple', passport.authenticate('apple') );


//로그인 인증
// router.get('/me', authMiddleware, checkMe);


module.exports = router;