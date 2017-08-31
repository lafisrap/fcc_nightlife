module.exports = (username, cb) => {
  const users = global.db.collection('users');

  console.log(1, "findUsers");

  if (!username) {
    return({
      error: 'Missing required parameter `username`',
    });
  }

  users.findOne({ 'name': username }).toArray((err, docs) => {
  console.log(2, docs);
    if (err) {
      return({
        error: err,
      });
    } else {
      return(docs[0]);     
    }
  });
}