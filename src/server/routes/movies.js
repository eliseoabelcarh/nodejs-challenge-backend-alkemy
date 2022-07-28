const passport = require("passport");
const { configurations } = require("../../configurations/configs");
const {
  crearErrorArgumentosInvalidos,
  crearErrorUnauthorizedResource,
} = require("../../errors/errorsHandler");
const useCasesFactory = require("../../useCases/useCasesFactory");
const router = require("express").Router();

function moviesHandler() {
  /**
   * --------------------------GET /movies -------------------------------
   * TODO TODO TODO
   */
  router.get("", function (req, res, next) {
    res.status(200).json("ok");
  });

  /**
   * -------------------------- GET /movies/:movieId -------------------------------
   * Returns the searched element by ID
   */
  router.get(
    "/:movieId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { movieId } = req.params;
      const cu = useCasesFactory.cuSearchElement();
      const movieInDB = await cu.find({
        type: "movie",
        field: "id",
        value: movieId,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully request movie by Id",
        movie: movieInDB,
      });
    })
  );
  /**
     * --------------------------POST /movies -------------------------------
     * Creates a movie and store it in database 
     */
  router.post(
    "",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async (req, res, next) => {
      const movie = req.body;
      const cu = useCasesFactory.cuSaveElement();
      const newMovie = await cu.saveElement({
        type: "movie",
        value: movie,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully add a new movie",
        movie: newMovie,
      });
    })
  );
  /**
       * --------------------------POST /movies/:movieId/characters ---------------------
       * Creates a new character and asociate to a especific movie Id 
       */
  router.post(
    "/:movieId/characters",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      console.log("paraMMMMMMMooooo", req.params);
      const { movieId } = req.params;
      const character = req.body
      console.log("bodyEnviadooo", req.body);
      const cu = useCasesFactory.cuUpdateElement()
      const characterAdded = await cu.update({
        type: "movie",
        id: movieId,
        action: "add",
        field: "character",
        value: character,
      });
      console.log("ACCCACAÑSSSLSLSLLSLS", characterAdded);
      res.status(200).json({
        success: true,
        msg: "You successfully add character to a Movie",
        character: characterAdded,
      });
    })
  );

  /**
   * --------------------------GET /movies/:movieId/characters?characterId=xxxx -------------------------------
   * Remove Character From Especific Movie (Id was provided)
   */
  router.delete("/:movieId/characters", 
  passport.authenticate("jwt-token", { session: false }),
  wrap(async function (req, res, next) {
    console.log("paramsss", req.params)
    console.log("query", req.query)
    const {movieId} = req.params
    const {characterId} = req.query

    res.status(200).json({
      success: true,
      msg: "You successfully remove character from Movie",
      movie: "movieUpdated",
    });
  }));


  /**
   * ------------------------ TESTING ROUTE --------------------------
   */
  router.get(
    `/test`, // optional: empty
    wrap(async (req, res) => {
      res.status(200).send("okayEnMoviesTest");
    })
  );
  return router;
}
module.exports = { moviesHandler };

/**
 * ------------------ EXPRESS ASYNC WRAPPER -------------------
 * We can capture errors and throw it up
 */
let wrap =
  (fn) =>
    (...args) =>
      fn(...args).catch(args[2]);
