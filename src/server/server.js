const express = require("express");
//const { crearRouterHandler } = require('./routerHandler')
//const { errorHandler } = require('../errors/serverErrorHandler')
const bodyParser = require('body-parser');
const {
  crearErrorAlConectarAServidorExpress,
} = require("../errors/errorsHandler");
require("dotenv").config();


function createServer({ port = 0 }) {
  const app = express();
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(express.json());
  //app.use("/api/", crearRouterHandler());
  //app.use(errorHandler);

  
  return new Promise((resolve, reject) => {
    const argumentReceived = arguments[0];
    if (argumentReceived.hasOwnProperty("port")) {
      app.set("port", argumentReceived.port);
    } else if (process.env.PORT) {
      app.set("port", process.env.PORT);
    } else if (port) {
      app.set("port", port);
    }

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

module.exports = {
  createServer,
};
