const MongoClient = require('mongodb').MongoClient;

// MongoDb Connection URL
const url = `mongodb://${process.env.MONGO_URI}`;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  if( err ) return console.error(err);

  global.db = db;
  console.log('Connected to Mongo Database.');

  // Create indices
  indexFood(db);
});

const indexFood = function(db) {
  // Get the collection
  var collection = db.collection('food');
  // Create the index
  collection.createIndex(
    { description : "text" },
    (err, result) => {
      if( err ) console.error(err);
    }
  );
};
