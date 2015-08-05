var r = require('rethinkdb')
				,assert = require('assert');

// RethinkDB database details.
var dbConfig = {
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db  : process.env.RDB_DB || 'nugget',
  tables: {
    'users': 'id',
    'about': 'id'
  }
};

//Export the Database config details
module.exports.dbConfig = dbConfig;

//Connect to database and make a 'connection' variable avaible to be used by all other queries.
var connection = null;
r.connect( {host: dbConfig.host, port: dbConfig.port, db: dbConfig.db}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

/*==================
All Query Functions
====================*/

//Sample query to fetch about
module.exports.getAbout = function(callback){
	r.table('about').limit(1).run(connection, function(err, cursor) {
    if (err) throw err;
    
    cursor.toArray(function(err, result) {
        if (err) throw err;
        callback(null, result);
    });
	});
}

//Setup the Database and create tables, executed only when app starts.
module.exports.setup = function() {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
    assert.ok(err === null, err);
    r.dbCreate(dbConfig.db).run(connection, function(err, result) {
      if(err) {
        console.log("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", dbConfig.db, err.name, err.msg, err.message);
      }
      else {
        console.log("[INFO ] RethinkDB database '%s' created", dbConfig.db);
      }

      for(var tbl in dbConfig.tables) {
        (function (tableName) {
          r.db(dbConfig.db).tableCreate(tableName, {primaryKey: dbConfig.tables[tbl]}).run(connection, function(err, result) {
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
};



