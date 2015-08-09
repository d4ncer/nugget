var express = require('express');
var router = express.Router();
var database = require('../config/database');
var users = require('../models/users');

router.get('/', function(req, res) {

	var aboutData = function(err, results){
		console.log("result: "  + results);
		if(err) 
			throw err;
		else
			res.render('about', {about: results});
	};

	console.log("Hello, at about")
	//Pass a callback to getAbout function to fetch About data
	users.getAll();
});


module.exports = router;
