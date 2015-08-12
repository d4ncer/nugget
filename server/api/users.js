var express = require('express');
var User = require('../models/users');
var auth = require('../auth/auth.service');
var router = express.Router();

// GET /api/users/ 
router.get('/', auth.isLoggedIn, function(req, res) {
  User.getAll(function(err, data) {
    if(err) {
      return res(err);
    } else {
      return res.send(data);
    }
  })
});

module.exports = router;
