const router = require("express").Router();
const { authHandler } = require("./routes/auth");
const { charactersHandler } = require("./routes/characters");
const { movieGenresHandler } = require("./routes/movieGenres");
const { moviesHandler } = require("./routes/movies");

function crearRouterHandler() {

  /**
   * ------------------------ SETTING HANDLE ROUTES --------------------------
   * I use covention word "API" to define a endpoint base route. 
   */
  router.use(`/api/auth`, authHandler());
  router.use(`/api/characters`, charactersHandler());
  router.use(`/api/movies`, moviesHandler());
  router.use(`/api/movieGenres`, movieGenresHandler());
  /**
   * ------------------------------ ERROR ROUTE ----------------------------
   */
   router.get(
    "/error",
    wrap(async (req, res, next) => {
      res.status(404).send("error page");
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