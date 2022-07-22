require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const { crearRouterHandler } = require("./routerHandler");
const { serverErrorHandler } = require("../errors/serverErrorHandler");
const {
  crearErrorAlConectarAServidorExpress,
} = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
const moongose = require("../database/connection");
const MongoStore = require("connect-mongo");

/**
 * ------------------- GET PASSPORT MODULE CONFIGURATION -------------------
 */
//Need to require the entire Passport module configuration
//so we can use it here as middleware
require("../auth/passport");

/**
 *
 *  ------------------ CREATE SERVER EXPRESS FUNCTION -------------------
 */
function createServer({ port = 0 }) {
  const app = express();

  //Getting arguments receive in CreateServer Function
  // and set custom port
  const received = arguments[0];
  setPort({ app, received, defaultPort: port });

  /**
   *  ------------------ CONFIGURE TESTING VIEWS FRONTEND -------------------
   */
  app.engine("ejs", require("ejs-mate"));
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");

  /**
   *  ------------------ EXTRA SETTINGS FOR SERVER -------------------
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
  app.use(require("cors")());
  app.use(require("morgan")("dev"));
  app.set("trust proxy", 1);

  const sessionStore = MongoStore.create({
    client: moongose.connection.getClient(),
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
      //cookie: {secure:true}
      //cookie: { maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: true },
    })
  );
  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(crearRouterHandler());
  

  app.use(serverErrorHandler);

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
    console.log("port emptyobject");
    app.set("port", defaultPort);
  } else if (received.hasOwnProperty("port")) {
    console.log("port con property port");
    app.set("port", received.port);
  } else if (process.env.PORT) {
    console.log("port env");
    app.set("port", process.env.PORT);
  }
}

module.exports = {
  createServer,
};
