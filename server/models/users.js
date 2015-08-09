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
  getAll: function(req, res){
  	User.orderBy("id").run().then(function(result) {
      res.send(JSON.stringify(result));
    }).error(handleError(res));
  }
};

function handleError(res){
	return function(error) {
    return res.send(500, {error: error.message});
  }
}

module.exports = UserApi;
