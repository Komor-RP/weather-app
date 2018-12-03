const express = require('express');
var request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/weather', (req, res) => {
  const name = req.query.name || 'World';
  var latitude = 42.3601;
  var longitude = -71.0589;
  var API_KEY = process.env.DARKSKYAPI
  request({
      method: 'GET',
      uri: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`,
      'content-type': 'application/json'
  },
  function(error, response, body) {
    if (error) {
        console.log(error)
    }
    return res.send(body);
  });

  
});



app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);