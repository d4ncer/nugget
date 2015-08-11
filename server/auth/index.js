var express = require('express');
var passport = require('passport');
var User = require('../models/users');
var config = require('../config/config');
var google = require('./google');

// Serialize and Deserialize users
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Configure all Passport strategies here
require('./google/passport').setup(User, config);

var router = express.Router();

// Pass calls to various strategies
router.use('/google', google);

module.exports = router;
