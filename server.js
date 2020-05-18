const express = require('express');
const config = require('config');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

//Connect Database
require('./startup/db')();

const PORT = process.env.PORT || config.port;

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
