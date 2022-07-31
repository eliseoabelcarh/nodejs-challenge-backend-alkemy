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
  router.get("",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      console.log("QUERYS", req.query)

      const cu = useCasesFactory.cuGetList();
      const movieGenresList = await cu.get({
        type: "movieGenre",
        visibleFields: [],//empty array => list all
        queries: req.query,
      })

      res.status(200).json({
        success: true,
        msg: "You successfully request movieGenres list",
        list: movieGenresList
      });
    })
  );
  /**
  * -------------------------- GET /movieGenres/:movieGenreId -------------------------------
  * Returns the searched element by ID
  */
  router.get("/:movieGenreId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { movieGenreId } = req.params
      const cu = useCasesFactory.cuFindElement()
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
    * --------------------------DELETE /movieGenres/:movieGenreId -------------------------------
    * Delete a movieGenre from database 
    */
  router.delete(
    "/:movieGenreId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async (req, res, next) => {
      const { movieGenreId } = req.params;
      const cu = useCasesFactory.cuDeleteElement()
      await cu.deleteElement({
        type: "movieGenre",
        value: movieGenreId,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully remove movieGenre from db"
      });
    })
  );
  /**
       * --------------------------POST /movieGenres/::movieGenreId/movies ---------------------
       * Creates a new movie and asociate to a specific movieGenre Id 
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
    * Remove Movie From specific MovieGenre (Id was provided)
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
     * --------------------------PUT /movieGenres/:movieGenreId ---------------------
     * Updates a movieGenre Field/s 
     */
  router.put(
    "/:movieGenreId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { movieGenreId } = req.params;
      const changes = req.body
      const cu = useCasesFactory.cuUpdateElement()
      const movieGenreUpdated = await cu.update({
        type: "movieGenre",
        id: movieGenreId,
        action: "modify",
        field: "element",
        value: changes,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully update movieGenre",
        movieGenre: movieGenreUpdated,
      });
    })
  );
  /**
   * ------------------------ TESTING ROUTE --------------------------
   * This a Test endpoint and appears in every file with base routes (/movies .. /characters ../auth etc..)
   * BUT ONLY ONE TEST USE CASE (in test file) was created for this kind of endpoint. 
   * if you want to remove it.. you can do that, but you will have to FIND OUT what route
   * and what file will be affected and then delete the test use case.(either way one test use case wont success)
   * Remember, this part is created for testing purposes only, and of course... FOR MY OWN ENTERTAINMENT too =)
   */
  router.get(
    `/test`,
    wrap(async (req, res) => {
      res.status(200).send("okay");
    })
  );

  /**
   * ---------------------- DONT FORGET RETURN ROUTER -------------------------
   */
  return router;
}


module.exports = { movieGenresHandler };

/**
 * ------------------ EXPRESS ASYNC WRAPPER -------------------
 * I can capture errors and throw it up
 */
let wrap =
  (fn) =>
    (...args) =>
      fn(...args).catch(args[2]);