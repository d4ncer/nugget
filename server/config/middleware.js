var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


module.exports = function(app) {
  var rootDir = process.cwd();

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

  // TODO: Change this to 'client/public' once build tool is set up
  app.use(express.static(path.join(rootDir, 'client/src')));
};