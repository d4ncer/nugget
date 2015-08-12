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
    clientID: "421138107178-tahgo4am6jombsod9p24v1m4o1oni6qb.apps.googleusercontent.com",
    clientSecret: "UjYT8jQJB0GaWKAGE4PGDuBZ",
    callbackURL: "/auth/google/callback"
  }
}
