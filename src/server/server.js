const express = require("express");
require('dotenv').config()

function createServer({ port = 0 }) {


  const app = express();
  // sets port 3000 to default or unless otherwise specified in the environment
  app.set("port", port  || process.env.PORT );

  return new Promise((resolve, reject) => {
    const server = app
      .listen(app.get("port"))
      .once("error", () => {
        reject(new Error("error al conectarse al servidor"));
      })
      .once("listening", () => {
        console.log("listening on port: " + server.address().port);
        resolve(server);
      });
  });
}

module.exports = {
  createServer,
};
