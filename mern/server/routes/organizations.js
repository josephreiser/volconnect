const express = require("express");
 
// orgRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const orgRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the organizations.
orgRoutes.route("/orgs").get(function (req, res) {
 let db_connect = dbo.getDb();
 db_connect
   .collection("Organizations")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// Get the info about an organization
orgRoutes.route("/orgs/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  return db_connect
      .collection("Organizations")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
 });

// Add a user to an org
orgRoutes.route("/orgs/newmember").post(function (req, res) {
  console.log(req.body)
  let db_connect = dbo.getDb();
  db_connect
  .collection('Organizations')
  .updateOne({"_id": ObjectId(req.body.organizationID)}, { $push: {"members": req.body._id}})
});

// Verify a username/email
orgRoutes.route("/orgs/verify").post(function (req, response) {
  console.log(req.body.email)
  let db_connect = dbo.getDb();
  let myquery = {email : req.body.email}
  db_connect
     .collection("Organizations")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       response.json(result);
     });
 });

// This section will help you create a new org
orgRoutes.route("/orgs/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    name: req.body.name,
    members: [],
    desc: req.body.desc,
 };
 db_connect.collection("Organizations").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});


 
// Delete an organization
orgRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("Organizations").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = orgRoutes;