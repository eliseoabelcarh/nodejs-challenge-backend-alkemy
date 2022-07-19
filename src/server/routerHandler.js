const express = require("express");
//const useCasesFactory = require('../useCases/useCasesFactory')
const {authHandler} = require("./routes/auth")
let wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);

function crearRouterHandler() {
  router = express.Router();

  //ruta de prueba para api
  router.get(
    "/test",
    wrap(async (req, res) => {
      res.status(200).send("okay");
    })
  );

  router.use("/auth", authHandler())
 
  
 

  return router;
}

module.exports = { crearRouterHandler };
