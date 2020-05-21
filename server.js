const express = require('express');
const config = require('config');

const app = express();

// Connect Database
require('./startup/db')();

// Security Middlewares
require('./startup/security')(app);

// Define Routes
require('./startup/routes')(app);

const PORT = process.env.PORT || config.get('port');

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
