const router = require("express").Router();
const { authHandler } = require("./routes/auth");

function crearRouterHandler() {

  /**
   * ------------------------ SETTING HANDLE ROUTES --------------------------
   */
  const routeAPI = "/api";
  router.use(`${routeAPI}/auth`, authHandler());

  /**
   * ------------------------------ ERROR ROUTE ----------------------------
   */
   router.get(
    "/error",
    wrap(async (req, res, next) => {
      console.log("ERROR page");
      res.status(404).send("error page");
    })
  );
  /**
   * ------------------------ TESTING ROUTE --------------------------
   */
  router.get(
    `${routeAPI}/test`,
    wrap(async (req, res) => {
      res.status(200).send("okay");
    })
  );

  return router;
}

module.exports = { crearRouterHandler };


/**
   * ------------------ EXPRESS ASYNC WRAPPER -------------------
   */
 let wrap =
 (fn) =>
 (...args) =>
   fn(...args).catch(args[2]);