var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');


module.exports = function(app) {
  var rootDir = process.cwd();

  // Set up cors
  app.use(cors());

  // view engine setup
  app.set('views', path.join(rootDir, 'server/views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  // Also add favicon module (var favicon = require('favicon');)
  //app.use(favicon(rootDir + '/public/favicon.ico'));

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    store: new RedisStore,
    secret: 'spicy nugget', 
    resave: true, 
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(path.join(rootDir, 'client/public')));

  app.locals.nodeEnv = app.get('env');
};