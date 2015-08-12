var config = require('./config');

// Initiate the Database connection
var thinky = require('thinky')(config.dbConfig);
var r = require('rethinkdb');

// Setup the Database
thinky.databaseSetUp = function() {
  r.connect({host: config.dbConfig.host, port: config.dbConfig.port}, function (err, connection) {
    if(err) {
      console.log(err);
    }
    r.dbCreate(config.dbConfig.db).run(connection, function(err, result) {
      if(err) {
        console.log("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", config.dbConfig.db, err.name, err.msg, err.message);
      }
      else {
        console.log("[INFO ] RethinkDB database '%s' created", config.dbConfig.db);
      }

      for(var tbl in config.dbConfig.tables) {
        (function (tableName) {
          r.db(config.dbConfig.db).tableCreate(tableName, {primaryKey: config.dbConfig.tables[tbl]}).run(connection, function(err, result) {
            if(err) {
              console.log("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", tableName, err.name, err.msg, err.message);
            }
            else {
              console.log("[INFO ] RethinkDB table '%s' created", tableName);
            }
          });
        })(tbl);
      }
    });
  });
}

// Export the Database connection
module.exports = thinky;