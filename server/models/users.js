var database = require('../config/database');
var thinky = require('thinky')(database.dbConfig);

var r = thinky.r;
var type = thinky.type;

// Create the model
var User = thinky.createModel("users", {
  id: type.string(),
  name: type.string(),
  email: type.string()
});

module.exports = {
	getAll: function() {
     //  console.log("About Thinky");
     //  console.log(User.orderBy({index: "id"}).run());
	    // return User.orderBy({index: "id"}).run();

      User.orderBy({index: "id"}).run().then(function(result) {
        return JSON.stringify(result);
      }).error(console.log(this));
	}
}