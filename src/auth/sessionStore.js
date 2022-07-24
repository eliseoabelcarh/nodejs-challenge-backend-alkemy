const MongoStore = require("connect-mongo");
const {connectMongoose} = require("../database/connectionMongoose");


async function getSessionStore(){
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

module.exports = {getSessionStore}