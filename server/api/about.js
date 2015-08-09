var express = require('express');
var router = express.Router();
var users = require('../models/users');

console.log(users.getAll());

router.get('/', function(req, res) {

  var aboutData = function(err, results){
    console.log("result: "  + results);
    if(err)
      throw err;
    else
      res.json({about: results});
  };
  console.log("OK, in about");

  //Pass a callback to getAbout function to fetch About data
  users.getAll();
});


module.exports = router;
