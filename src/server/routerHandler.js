const router = require("express").Router();
const { authHandler } = require("./routes/auth");
const { charactersHandler } = require("./routes/characters");
const { docsHandler } = require("./routes/docs");
const { movieGenresHandler } = require("./routes/movieGenres");
const { moviesHandler } = require("./routes/movies");

function crearRouterHandler() {

  /**
   * ------------------------ SETTING HANDLE ROUTES --------------------------
   */
  router.use(`/api/auth`, authHandler());
  router.use(`/api/characters`, charactersHandler());
  router.use(`/api/movies`, moviesHandler());
  router.use(`/api/movieGenres`, movieGenresHandler());
  router.use(`/api/docs`, docsHandler());
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