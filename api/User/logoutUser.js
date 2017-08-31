module.exports = (req, res, next) => {
  req.logout();
  res.redirect('/');
};
