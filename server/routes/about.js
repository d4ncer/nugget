var express = require('express');
var router = express.Router();

/* GET index */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'About' });
});

module.exports = router;
