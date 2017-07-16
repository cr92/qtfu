const express = require('express');
const fuber = require('./fuber');
const app = express();
const PORT = 9000;

app.get('/user/start', (req, res) => {
  var req_data = req.query;
  res
    .status(200)
    .send(fuber.startTrip(req_data));
})

app.get('/user/end', (req, res) => {
  var req_data = req.query;
  res
    .status(200)
    .send(fuber.endTrip(req_data));
})

app.get('/user/all', (req, res) => {
  res
    .status(200)
    .send(fuber.getAllCars());
})

app.listen(PORT, () => console.log('Port', PORT));
