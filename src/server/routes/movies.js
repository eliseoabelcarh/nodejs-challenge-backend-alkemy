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
   * -------------------------- /MOVIES ROUTE -------------------------------
   */
  router.get("", function (req, res, next) {
    res.status(200).json("koakka");
  });
  router.get(
    "/:movieId",
    wrap(async function (req, res, next) {
      console.log("parammmmssss", req.params);
      const { movieId } = req.params;
      const cu = useCasesFactory.cuSearchElement();
      const movie = await cu.find({
        type: "movie",
        field: "id",
        value: movieId,
      });
      console.log("moviesss", movie);
      res.status(200).json({
        success: true,
        msg: "You successfully request movie",
        movie: "resultado",
      });
    })
  );

  router.post(
    "",
    passport.authenticate("jwt-token", { session: false }),

    wrap(async (req, res, next) => {
      const movie = req.body;
      console.log("moviee3e3", req.body);

      const cu = useCasesFactory.cuSaveElement();
      const newMovie = await cu.saveElement({
        type: "movie",
        value: movie,
      });
      console.log("-----------ANTES DE ENVIAR", newMovie);
      res.status(200).json({
        success: true,
        msg: "You successfully add a new movie",
        movie: newMovie,
      });
    })
  );

  router.post(
    "/:movieId/characters",
    wrap(async function (req, res, next) {
      console.log("paraMMMMMMMooooo", req.params);
      const { movieId } = req.params;
      const character = req.body
      console.log("bodyEnviadooo", req.body);
      const cu = useCasesFactory.cuUpdateElement()
      const movieUpdated = await cu.update({
        type: "movie",
        id: movieId,
        action: "add",
        field: "character",
        value: character,
      });
      console.log("movieerreeAtualizado", movieUpdated);
      res.status(200).json({
        success: true,
        msg: "You successfully add character to a Movie",
        movie: movieUpdated,
      });
    })
  );
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
