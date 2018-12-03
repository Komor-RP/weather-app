const express = require('express');
var request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/weather', (req, res) => {
    var API_KEY = process.env.DARKSKYAPI
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    request({
        method: 'GET',
        uri: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`,
        'content-type': 'application/json'
    },
    function(error, response, body) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        }
        return res.status(200).send(body);
    });

  
});



app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);