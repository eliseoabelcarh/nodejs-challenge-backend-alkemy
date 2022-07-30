const MongoStore = require("connect-mongo");
const { connectMongoose } = require("../database/connectionMongoose");

/**
 * Only need it if you are using Local Strategy Authentication
 * Mongo DB database is necessary for use this options
 * @returns sessionStore need it for Local Strategy Authentication
 */
async function getSessionStore() {
  const mongooseConected = await connectMongoose()

  const sessionStore = MongoStore.create({
    client: mongooseConected.connection.getClient(),
    collectionName: "sessions",
    dbName: process.env.MONGO_DB_NAME,
    stringify: false,
    autoRemove: "interval",
    autoRemoveInterval: 1,
  });
  return sessionStore

}

module.exports = { getSessionStore }