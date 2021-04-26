const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 8081;

app.use(cors());

// NOTE: back-end is product-list owner -> require an endpoint to get all products
// NOTE: error handling?
app.get('/temperature/:id', (req, res) => {
  fetch(
    `https://temperature-sensor-service.herokuapp.com/sensor/${req.params.id}`
  )
    .then((response) => response.json())
    .then((response) => res.send(response));
});

app.listen(port, () => {
  console.log(`SensorTech server at http://localhost:${port}`);
});
