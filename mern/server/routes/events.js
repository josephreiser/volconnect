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
eventRoutes.route("/events/view").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
    .collection('Events')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get event by creator ID
eventRoutes.route("/events/find").post(function (req, res) {
    let db_connect = dbo.getDb();
    console.log(req.body._id)
    let myquery = {creator : req.body._id}
    console.log(req.body._id)
    db_connect
    .collection('Events')
    .findOne(myquery, function (err, result) {
        console.log(result)
        if (err) throw err;
        res.json(result);
    });
});

// Add a user to the list of attendees for an event
eventRoutes.route("/events/update").post(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
    .collection('Events')
    .updateOne({"_id": ObjectId(req.body.eventid)}, { $push: {"attendees": req.body.userid, "attendeeList": [req.body.userFirst + " " + req.body.userLast, req.body.userid]}})
});

// Create an event.
eventRoutes.route("/events/create").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        desc: req.body.desc,
        attendees: [],
        attendeeList: [],
        creator: req.body.creator
    };
    console.log(myobj)
    db_connect
    .collection('Events')
    .insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = eventRoutes;
