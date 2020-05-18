const express = require('express');
const config = require('config');

const app = express();

// Connect Database
require('./startup/db')();

// Define Routes
require('./startup/routes')(app);

const PORT = process.env.PORT || config.port;

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
