module.exports = {
  // RethinkDB database details.
  dbConfig: {
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT) || 28015,
    db: process.env.RDB_DB || 'nugget',
    tables: {
      'users': 'id'
    }
  },
  // Google OAuth Details
  google: {
    clientID: "fillInTheBlanks",
    clientSecret: "fillInTheBlanks",
    callbackURL: "/auth/google/callback"
  }
}
