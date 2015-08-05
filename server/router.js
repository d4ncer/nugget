var middleware = require('./config/middleware');
var database = require('./config/database');
var index = require('./routes/index');
var about = require('./routes/about');

var apiAbout = require('./api/about');

module.exports = function(app) {

  // Add common middleware here
  middleware(app);

  //Connect to Database
  database.setup();

  // All routes
  app.use('/', index);
  app.use('/about', about);

  app.use('/api/about', apiAbout);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500).json({
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: {}
    });
  });

};