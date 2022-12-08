// Authors: Joe Reiser (33%), Lauren Young (33%), Kavi Palmer (33%)

const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /requests.
const requestRoutes = express.Router();

const ObjectId = require("mongodb").ObjectId;
const dbo = require("../db/conn");

// This will return a Geocoordinate based on a location name, using Google's Geocoding API
requestRoutes.route("/requests/getCoordinates/:name").get(function (req, res) {
    let request = new XMLHttpRequest();
    let url = "https://geocoder.ls.hereapi.com/6.2/geocode.json&apikey=" +
    "&searchtext=" + request.params.address
    request.open("GET", url)
    request.send()
    request.onload = () => {
        console.log(request)
        if (request.status == 200){
            console.log(JSON.parse(request.response()))
            res.json(request.response());
        } else {
            console.log('error ${request.status} ${rcequest.statusText}')
        }
    }
});

// This route will help you get a list of events near a specific location
requestRoutes.route("/requests/getEvents/:location").get(function (req, res) {
    console.log(req.params.location)
    let db_connect = dbo.getDb();
    let myquery = { quizName: req.params.quizName};
    db_connect
        .collection("Events")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
   });

module.exports = requestRoutes;   
