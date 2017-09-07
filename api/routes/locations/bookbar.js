const Bars = require("../../models/bars");
const { getToday } = require('../../utils');

module.exports = function(req, res) {
  const { barid, book } = req.body;
  const { username } = req.user;
  const book_ = book === 'true';
  const date = getToday();

  if( !barid ) return res.json({ success: false, error: 'Please specify parameter \'barid\'.'})

  Bars.findOne({ barid, date }, function (err, bar) {
    if (err) return next(err);

    console.log(5, barid, date, username, book_);
    if( !bar && book_ ) {
      // Noone booked this bar yet
      bar = new Bars({
        barid,
        date,
        bookedby: [username]
      })
    } else if (bar) {
      // Someone booked the bar
      const index = bar.bookedby.indexOf(username);

      // Book it if it's not already booked by the same user
      if (book_ && index === -1) {
        bar.bookedby.push(username);      
      } else if (!book_ && index !== -1) {
        bar.bookedby.splice(index, 1);
      } else {
          res.json({ success: false, error: `Booking can't be ${ book_? 'added' : 'removed' }.` });
          return;
      }      
    } else {
      res.json({ success: false, error: `Booking can't be removed.` });
      return;
    }

    bar.save(err => {
      if (err) res.json({ success: false, error: `Error saving booking.` });
      else res.json({ success: true });
    });
  });
};


// lafisrap: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhZmlzcmFwIiwiZW1haWwiOiJmY2NAbWljaGFlbHNjaG1pZHQuYmVybGluIiwiaWF0IjoxNTA0Nzg1OTQwfQ.0qZo9gv76ZqA6_hoKPH24OWFwr5c40d1te6-cr_7ESI
// Michael10: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pY2hhZWwxMCIsImVtYWlsIjoiYUBhYS5hYSIsImlhdCI6MTUwNDc4MjgyMX0.t_HWn8tvONpUM2-NtNSmywwEoazZ5pGbuiaqqg9Wu7o