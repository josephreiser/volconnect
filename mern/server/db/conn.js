const { MongoClient, ServerApiVersion } = require("mongodb");
const Db = process.env.ATLAS_URI;
console.log(Db)

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(async function (err, db) {
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
