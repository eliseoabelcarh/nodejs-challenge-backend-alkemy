const passport = require("passport");
const { configurations } = require("../../configurations/configs");
const {
  crearErrorArgumentosInvalidos,
  crearErrorUnauthorizedResource,
} = require("../../errors/errorsHandler");
const useCasesFactory = require("../../useCases/useCasesFactory");
const router = require("express").Router();

function movieGenresHandler() {
  /**
   * --------------------------GET /movieGenres -------------------------------
   */
  router.get("", function (req, res, next) {
    res.status(200).json("koakka");
  });
  /**
  * -------------------------- GET /movieGenres/:movieGenreId -------------------------------
  * Returns the searched element by ID
  */
  router.get("/:movieGenreId",
  passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { movieGenreId } = req.params
      const cu = useCasesFactory.cuSearchElement()
      const movieGenre = await cu.find({ type: "movieGenre", field: "id", value: movieGenreId })
      res.status(200).json({
        success: true,
        msg: "You successfully request movie",
        movieGenre: movieGenre
      });
    })
  );

  /**
      * --------------------------POST /movieGenres -------------------------------
      * Creates a movieGenre and store it in database 
      */
  router.post(
    "",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async (req, res, next) => {
      const movieGenre = req.body;
      const cu = useCasesFactory.cuSaveElement();
      const newMovieGenre = await cu.saveElement({
        type: "movieGenre",
        value: movieGenre,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully add a new movie",
        movieGenre: newMovieGenre
      });
    })
  );
  /**
       * --------------------------POST /movieGenres/::movieGenreId/movies ---------------------
       * Creates a new movie and asociate to a especific movieGenre Id 
       */
  router.post(
    "/:movieGenreId/movies",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { movieGenreId } = req.params;
      const movie = req.body
      const cu = useCasesFactory.cuUpdateElement()
      const movieAdded = await cu.update({
        type: "movieGenre",
        id: movieGenreId,
        action: "add",
        field: "movie",
        value: movie,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully add movie to a MovieGenre",
        movie: movieAdded,
      });
    })
  );
 /**
   * --------------------------DELETE /movieGenres/:movieGenreId/movies?movieId=xxxx -------------------------------
   * Remove Movie From Especific MovieGenre (Id was provided)
   */
  router.delete("/:movieGenreId/movies",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      console.log("paramsss", req.params)
      console.log("query", req.query)
      const { movieGenreId } = req.params
      const { movieId } = req.query
      const cu = useCasesFactory.cuUpdateElement()
      const movieGenreUpdated = await cu.update({
        type: "movieGenre",
        id: movieGenreId,
        action: "remove",
        field: "movie",
        value: movieId,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully remove movie from MovieGenre",
        movie: movieGenreUpdated,
      });
    }));

  /**
   * ------------------------ TESTING ROUTE --------------------------
   */
  router.get(
    `/test`,// optional: empty
    wrap(async (req, res) => {
      res.status(200).send("okayEnMovieGenreTest");
    })
  );
  return router;
}
module.exports = { movieGenresHandler };

/**
 * ------------------ EXPRESS ASYNC WRAPPER -------------------
 * We can capture errors and throw it up
 */
let wrap =
  (fn) =>
    (...args) =>
      fn(...args).catch(args[2]);