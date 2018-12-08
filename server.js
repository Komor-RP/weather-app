const express = require('express');
var request = require('request');
require('dotenv').config({ path: '.env.development'});
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



app.get('/location', (req, res) => {

});


function getLocation(callback, location, res) {
    let MAPQUEST_KEY = process.env.MAPQUEST_KEY;
    request({
        method: 'GET',
        uri: `http://www.mapquestapi.com/geocoding/v1/address?key=${MAPQUEST_KEY}&location=${location}`,
        'content-type': 'application/json'
    },
    function(error, response, body) {
        if (!error && response.statusCode === 200) {
            data = JSON.parse(body);
            let latitude = data.results[0].locations[0].latLng.lat;
            let longitude = data.results[0].locations[0].latLng.lng;
            console.log(longitude);
            callback(latitude, longitude, res);
        } else {
            console.log("There was an error getting the coordinates.");
            console.log(error);
        }

    });
}

function getWeather(latitude, longitude, res) {
    let API_KEY = process.env.DARKSKY_KEY;

    request({
        method: 'GET',
        uri: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`,
        'content-type': 'application/json'
    },
    function(error, response, body) {
        if (!error && response.statusCode === 200) {
            return res.status(200).send(body);
        } else {
            console.log("There was an error getting the weather data.");
            console.log(error);
            return res.status(500).send(error);
        }
    });
}

app.get('/weather', (req, res) => {
    
    let location = req.query.location;
    console.log("location", location);
    return getLocation(getWeather, location, res);

  
});



app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);