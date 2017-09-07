const jwt = require('jsonwebtoken');
const User = require("../../models/user");

console.assert(process.env.JWT_SECRET, "Environment variable JWT_SECRET has to be set.");

module.exports = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {

          // Translate user document to JSON and add JWT token
          user = user.toJSON();
          user.token = 'bearer ' + jwt.sign(user, process.env.JWT_SECRET);

          res.json({ success: true, user });
        } else {
          res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
};