'use strict';
const passport = require('passport');
const Food = require('./Food');
const User = require('./User');

module.exports = function(app) {
  // API Server Endpoints
  // User
  //app.post('/user', User.createUser);
  app.get('/login', (req, res) => { console.log("Get Login! ", req.body); });
  app.post('/api/login', User.loginUser);
  //app.post('/forgot', User.forgotPassword);
  //app.post('/reset', User.newPassword);
  //app.post('/verifyLink', User.verifyEmail);

  // Food
  app.get('/api/getfood', Food.getFood);
}
