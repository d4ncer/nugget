var express = require('express');
var passport = require('passport');
var config = require('../../config/config');
var User = require('../../models/users');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use Passport Google Strategy
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile, function (err, user) {
      return done(err, user);
    });
  })
);


var router = express.Router();

// Authentication with google
router.get('/',
  passport.authenticate('google', { failureRedirect: '/', scope: ['https://www.googleapis.com/auth/plus.login', 'email'] })
);

// Callback from Google
router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.send(req.user)
  }
);

module.exports = router;