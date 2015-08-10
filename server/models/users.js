var thinky = require('../config/database');

var r = thinky.r;
var type = thinky.type;

// Create the model
var User = thinky.createModel("users", {
  id: type.string(),
  name: type.string(),
  email: type.string()
});

// Define User API Endpoints
var UserApi = {
  getAll: function(callback){
  	User.orderBy("id").run(function(err, data) {
      callback(err, data);
    });
  }
};

module.exports = UserApi;
