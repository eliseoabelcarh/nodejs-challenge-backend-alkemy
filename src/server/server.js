const express = require("express");
const { crearRouterHandler } = require("./routerHandler");
const { serverErrorHandler } = require("../errors/serverErrorHandler");
const bodyParser = require("body-parser");
const {
  crearErrorAlConectarAServidorExpress,
  crearErrorArgumentosInvalidos,
} = require("../errors/errorsHandler");
require("dotenv").config();

function createServer({ port = 0 }) {
  const app = express();

  const received = arguments[0];
  setPort({app,received,defaultPort:port})

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(express.json());

  app.use("/api/", crearRouterHandler());
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

function setPort({app,received,defaultPort}){
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
