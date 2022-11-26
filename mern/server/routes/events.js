const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const eventRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// List all events.
eventRoutes.route("/events").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
    .collection("Events")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Create an event.
eventRoutes.route("/events/create").post(function (req, response) {
    console.log(req)
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        date: req.body.date,
        startTime: req.body.starttime,
        endTime: req.body.endtime,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        desc: req.body.desc
    };
    console.log(myobj)
    db_connect.collection('Events').insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = eventRoutes;
