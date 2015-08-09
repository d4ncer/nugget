var express = require('express');
var router = express.Router();
var User = require('../models/users');

// GET /api/users/ 
router.get('/', User.getAll);

module.exports = router;
