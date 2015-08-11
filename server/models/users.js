var thinky = require('../config/database');

var r = thinky.r;
var type = thinky.type;

// Create the model
var User = thinky.createModel("users", {
  id: type.string(),
  google_id: type.string(),
  name: type.string(),
  email: type.string(),
  image: type.string()
});

// Define User API Endpoints
var UserApi = {
  getAll: function(callback) {
  	User.orderBy("id").run(function(err, data) {
      callback(err, data);
    });
  },
  findOrCreate: function(profile, callback) { 
    User.filter({'google_id': profile.id}).run(function(err, user){
      if (err) {
        console.log("ERROR rethinkdb findOrCreate: " + err.message);
      } else if (user.length != 0) {
        return callback(null, user)
      } else {
        User.insert({
          google_id: profile.id,
          name: profile.displayName,
          eamil: profile.emails[0].value,
          image: profile.photos[0].value
        }).run(function (err, result) {
          if (result.inserted == 1) {
            User.filter({'google_id': profile.id}).limit(1).run(function(err, user){
              if (err) {
                console.log("ERROR rethinkdb findOrCreate: " + err.message);
              } else {
                return callback(null, user)
              }
            })
          }
        })
      }
    })
  }
};

module.exports = UserApi;
