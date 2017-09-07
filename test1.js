'use strict';
 
const yelp = require('yelp-fusion');
 
const client = yelp.client('8t-czDbQgUoOa-G9n0Zxk_qfxtl5RjLyUr-lrLyEzE2R9rCiElwuzAwrUac92tBHFVe2IYGJkPYbvnXX4OmJ_3vmxAOYACCxyUKIIrDovIWhbxqS-XqBbOKsOxuwWXYx');
 
client.search({
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
}).then(response => {
  console.log(JSON.stringify(response.jsonBody.businesses));
}).catch(e => {
  console.log(e);
});