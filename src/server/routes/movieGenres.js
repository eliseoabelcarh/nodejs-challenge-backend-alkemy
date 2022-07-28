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
   * -------------------------- /MOVIES GENRES ROUTE -------------------------------
   */
  router.get("", function (req, res, next) {
    res.status(200).json("koakka");
  });
  router.get("/:movieGenreId",
  wrap(async function (req, res, next) {
    console.log("parammmmGenreeeeessss",req.params)
    const {movieGenreId} = req.params
    const cu = useCasesFactory.cuSearchElement()
    const movieGenre = await cu.find({type:"movieGenre",field:"id",value:movieGenreId})
    console.log("movieGenreee", movieGenre)
    res.status(200).json({
      success: true,
      msg: "You successfully request movie",
      movieGenre: movieGenre
    });
  })
  
  
  
  );


  router.post(
    "",
    passport.authenticate("jwt-token", { session: false }),

    wrap(async (req, res, next) => {
        console.log("asooooo----------------------------------------");
      const movieGenre = req.body;
      console.log("movieGenree3e3", req.body);

      const cu = useCasesFactory.cuSaveElement();
      const newMovieGenre = await cu.saveElement({
        type: "movieGenre",
        value: movieGenre,
      });
      console.log("-----------ANTES DE ENVIAR",newMovieGenre)
      res.status(200).json({
        success: true,
        msg: "You successfully add a new movie",
        movieGenre: newMovieGenre
      });
    })
    


  );

  router.post(
    "/:movieGenreId/movies",
    wrap(async function (req, res, next) {
      console.log("paprmamamammammsssssso", req.params);
      const { movieGenreId } = req.params;
      const movie = req.body
      console.log("bodyEnviadooo", req.body);
      const cu = useCasesFactory.cuUpdateElement()
      const movieGenreUpdated = await cu.update({
        type: "movieGenre",
        id: movieGenreId,
        action: "add",
        field: "movie",
        value: movie,
      });
      console.log("movieerreeGenreee--Atualizado", movieGenreUpdated);
      res.status(200).json({
        success: true,
        msg: "You successfully add movie to a MovieGenre",
        movie: movieGenreUpdated,
      });
    })
  );


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