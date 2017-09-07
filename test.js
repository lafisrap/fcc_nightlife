'use strict';
 
const yelp = require('yelp-fusion');
 
const token = yelp.accessToken('rCz5JH9Aits9noC0IPxbiA', '5SeOZGfuNRso21b3nTLeEvHkWhReQoDtFRz9h3n5OFHFJLsk97IulTwOJJvpsipu').then(response => {
  console.log(response.jsonBody.access_token);
}).catch(e => {
  console.log(e);
});