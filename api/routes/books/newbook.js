const Book = require("../../models/book");
const getToken = require('../../utils').getToken;

module.exports = function(req, res) {
  console.log(6,req.headers, getToken);
  var token = getToken(req.headers);
  console.log(7,token);
  if (token) {
    var newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher
    });
  console.log(8,newBook);

    newBook.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save book failed.'});
      }
      res.json({success: true, msg: 'Successful created new book.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
};
