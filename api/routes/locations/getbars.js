const yelp = require('yelp-fusion');
const Bars = require("../../models/bars");
const { getToday } = require('../../utils');

const YELP_API = 'https://api.yelp.com/v3/businesses/search';

console.assert(process.env.YELP_TOKEN, "Environment variable YELP_TOKEN has to be set.");

module.exports = function(req, res, next) {
  const { location } = req.query;
  const date = getToday();

  // Find bookings of today
  Bars.find({ date }, function (err, bars) {
    const client = yelp.client(process.env.YELP_TOKEN);

    client.search({
      location: location || "Berlin"
    }).then(response => {
      const { businesses } = response.jsonBody;
      const locations = businesses.map(business => {
        const booking = bars.find(bar => business.id === bar.barid);

        if (booking) business.bookedby = booking.bookedby;

        return business;
      })

      res.json(locations);
    }).catch(e => {
      console.log(e);
    });
  });
};
