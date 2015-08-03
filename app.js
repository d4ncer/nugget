var express = require('express');
var router = require('./server/router');

var app = express();

// Set up all routing middleware
router(app);

module.exports = app;
