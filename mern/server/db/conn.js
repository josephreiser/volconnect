const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(async function (err, db) {
      console.log('hello')
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("VolunteerConnect");
        
        docCount = await _db.collection('Events').countDocuments();        
        if (docCount == 0){
          let sampleEvent = {
            Location: 'Joey Headquarters'
          };
          _db.collection('Events').insertOne(sampleEvent, function(err, res) {
            if (err) throw err
          });
        }
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
    });
  },
 
  getDb: function () {
    return _db;
  },
};
