var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {
  passport.use(new GoogleStrategy({
      clientID: "421138107178-tahgo4am6jombsod9p24v1m4o1oni6qb.apps.googleusercontent.com",
      clientSecret: "EZTxMlskNDg4zgJnPk2loEtu",
      callbackURL: "http://127.0.0.1:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));
}
