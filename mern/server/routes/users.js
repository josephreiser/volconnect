const express = require("express");
 
// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
userRoutes.route("/users").get(function (req, res) {
 let db_connect = dbo.getDb();
 db_connect
   .collection("Users")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will verify a username/email
userRoutes.route("/users/verify").post(function (req, response) {
  console.log(req.body.email)
  let db_connect = dbo.getDb();
  let myquery = {email : req.body.email}
  db_connect
     .collection("Users")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       response.json(result);
     });
 });

// This section will help you get a single record by id
userRoutes.route("/users/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 return db_connect
     .collection("Users")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// This section will help you create a new record.
userRoutes.route("/users/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    status: req.body.status,   
    email: req.body.email, 
    organization: req.body.organization,  
    eventsAttended: []
 };
 db_connect.collection("Users").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// Add an event to a list of attendees' verified events
userRoutes.route("/users/update/").post(function (req, response) {
  let db_connect = dbo.getDb(); 
  let attendees = req.body.attendees
  for (var i = 0; i < attendees.length; i++){
    db_connect
      .collection('Users')
      .updateOne({"_id": ObjectId(attendees[i][1])}, { $push: {"eventsAttended": req.body.event}})
  }
});

// Retrieve a list of users by ID
userRoutes.route("/users/group/").post(function (req, response) {
  let db_connect = dbo.getDb(); 
  let attendees = req.body.attendees
  let obj_ids = attendees.map(function(id) { return ObjectId(id); });
  let myquery = {_id: {$in: obj_ids}}
   db_connect
    .collection("Users")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
   
});
 
// This section will help you delete a user
userRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("Users").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = userRoutes;