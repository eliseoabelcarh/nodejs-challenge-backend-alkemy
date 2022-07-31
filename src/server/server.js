require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const { crearRouterHandler } = require("./routerHandler");
const { serverErrorHandler } = require("../errors/serverErrorHandler");
const { connectMongoose } = require("../database/connectionMongoose");
const {crearErrorAlConectarAServidorExpress} = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");

/**
 * ------------------- GET PASSPORT MODULE CONFIGURATION -------------------
 */
//Need to require the entire Passport module configuration
//so I can use it here as middleware
require("../auth/passport");
/**
 *
 *  ------------------ CREATE SERVER EXPRESS FUNCTION -------------------
 */
async function createServer({ port = 0 }) {
  //Creating APP
  const app = express();

  // CORS enables controlled access to resources located outside of a given domain
  // Necessary for some online client agents for consuming our apis
  app.use(
    cors({
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );
  // Getting arguments received in CreateServer Function
  // and set custom port
  setPort({ app, received: arguments[0], defaultPort: port });

  /**
   *  ------------------ CONFIGURE VIEWS FRONTEND ------------------
   * Only configurated for Local Strategy authentication and session cookies
   * The views will show a form with username and password fields.
   * For JWT Token is useless, because we use in that case POST request
   * and send a json object with data.
   */
  app.engine("ejs", require("ejs-mate"));
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");

  /**
   *  ------------------ EXTRA SETTINGS FOR SERVER -------------------
   * Some of this configurations covers more than neccesary, but i leave it here
   * just in case, maybe some of it will neccesary if you want extra features like 
   * receive files like images in your server, or receive data in console as developer.
   */
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(require("morgan")("dev"));
  app.set("trust proxy", 1);


  /**
   * ------------------------- SESSION FOR LOCAL STRATEGY AUTHENTICATION ONLY --------------------------------
   * This part only works for you if Local Authentication Strategy is enabled
   * This session store save a session in database, in this case mongoDB using mongoose,
   * You have to configure if you want to use it. 
   * For JWT Strategy is useless because we dont use sessions, and is made it strictly to
   * use it with any database or ORM, in our case, we complete all requirements using
   * a DAO called daoElementsSequelize and daoUsersSequelize.
   */
  const mongooseConected = await connectMongoose();

  const sessionStore = MongoStore.create({
    client: mongooseConected.connection.getClient(),
    collectionName: "sessions",
    dbName: process.env.MONGO_DB_NAME,
    stringify: false,
    autoRemove: "interval",
    autoRemoveInterval: 1,
  });

  app.use(
    session({
      genid: (req) => {
        return uuidv4();
      },
      secret: "topscret",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    })
  );

  //This middleware is optional, allows the developers to send a message
  // whenever a user is redirecting to a specified web-page
  app.use(flash());

  // Initialize Local Authentication Sessions (For Local Authentication Strategy only)
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * --------------------------------- ROUTER HANDLER -----------------------------------
   */
  app.use(crearRouterHandler());
  /**
    * --------------------------------- SERVER ERRORS HANDLER -----------------------------------
    */
  app.use(serverErrorHandler);

  /**
   * --------------------------------- RETURNING EXPRESS SERVER -----------------------------------
   */
  return new Promise((resolve, reject) => {
    const server = app
      .listen(app.get("port"))
      .once("error", () => {
        reject(crearErrorAlConectarAServidorExpress());
      })
      .once("listening", () => {
        console.log("LISTENING on port: " + server.address().port);
        resolve(server);
      });
  });
}

/**
 *
 *  ------------------ SETTING PORT FOR SERVER FUNCTION -------------------
 */
function setPort({ app, received, defaultPort }) {
  if (Object.keys(received).length === 0) {
    app.set("port", defaultPort);
  } else if (received.hasOwnProperty("port")) {
    app.set("port", received.port);
  } else if (process.env.PORT) {
    app.set("port", process.env.PORT);
  }
}

module.exports = {
  createServer,
};
