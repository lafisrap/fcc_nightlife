const Bars = require("../../models/bars");
const { getToday } = require('../../utils');

module.exports = function(req, res) {
  const { barid } = req.body;
  const { username } = req.user;
  const date = getToday();

  if( !barid ) return res.json({ success: false, error: 'Please specify parameter \'barid\'.'})

  Bars.findOneAndUpdate({
    barid, date 
  }, {
    $push: { 
      bookedby: username
    }
  }, function (error, result) {
    if (error) return res.json({ error: `Error saving booking: ${error}` });
    if (!result) {
      const bar = new Bars({
        barid,
        date,
        bookedby: [username]
      });

      bar.save();
    }

    res.json({ success: true });
  });
};
