const createUser = require('./createUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const forgotPassword = require('./forgotPassword');
const newPassword = require('./newPassword');
const verifyEmail = require('./verifyEmail');

module.exports = { 
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  newPassword,
  verifyEmail
}