var express = require('express');
var router = express.Router();
var User = require('../models/users');

// GET /api/users/ 
router.get('/', function(req, res) {
  User.getAll(function(err, data) {
    if(err) {
      return res(err);
    } else {
      return res.send(data);
    }
  })
});

module.exports = router;
