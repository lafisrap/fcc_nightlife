'use strict'; 
const express = require('express');
const passport = require('passport');
require('../config/passport')(passport);

const router = express.Router();

router.post('/signup', require('./users/signup'));
router.post('/signin', require('./users/signin'));
router.post('/book', passport.authenticate('jwt', { session: false }), require('./books/newbook'));

//router.post('forgot', null);
//router.post('reset', null);
//router.post('verifyLink', null);

router.get('/food', require('./food/getfood'));
router.get('/book', passport.authenticate('jwt', { session: false }), require('./books/getbook'));

module.exports = router;