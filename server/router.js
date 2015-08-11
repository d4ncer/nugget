var middleware = require('./config/middleware');
var thinky = require('./config/database');
var index = require('./routes/index');
var about = require('./routes/about');
var apiUser = require('./api/users');
var passport = require('passport');
var modelUser = require('./models/users');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function(app) {

  // Add common middleware here
  middleware(app);

  //Setup the Database, if not setup already
  thinky.databaseSetUp();

  // All routes
  app.use('/', index);
  app.use('/about', about);
  app.use('/api/users', apiUser);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new GoogleStrategy({
      clientID: "421138107178-tahgo4am6jombsod9p24v1m4o1oni6qb.apps.googleusercontent.com",
      clientSecret: "UjYT8jQJB0GaWKAGE4PGDuBZ",
      callbackURL: "http://localhost:3001/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      modelUser.findOrCreate(profile, function (err, user) {
        console.log(user);
        return done(err, user);
      });
    }
  ));

  app.get('/logged', function(req, res, next) {
    res.send({"about": req.user});
  });

  app.get('/logout', function(req, res, next) {
    res.send(req.logout());
  });

  // Authentication with google
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }),
    function(req, res) {}
  );

  // Callback from Google
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      res.send(req.user)
    }
  );



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