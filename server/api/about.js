var express = require('express');
var router = express.Router();
var database = require('../config/database');

router.get('/', function(req, res) {

  var aboutData = function(err, results){
    console.log("result: "  + results);
    if(err)
      throw err;
    else
      res.json({about: results});
  };

  //Pass a callback to getAbout function to fetch About data
  database.getAbout(aboutData);
});


module.exports = router;
