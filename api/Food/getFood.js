module.exports = (req, res, next) => {
  const food = global.db.collection('food');
  const q = req.query.q;

  if (!q) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  food.find({ '$text': {'$search' : q } }).toArray((err, docs) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json(docs);     
    }
  });
}