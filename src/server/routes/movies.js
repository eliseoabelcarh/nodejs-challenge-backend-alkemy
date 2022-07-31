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
   */
  router.get("",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      console.log("QUERYS", req.query)

      const cu = useCasesFactory.cuGetList();
      const moviesList = await cu.get({
        type: "movie",
        visibleFields: [],//empty array => list all
        queries: req.query,
      })

      res.status(200).json({
        success: true,
        msg: "You successfully request movies list",
        list: moviesList
      });
    })
  );

  /**
   * -------------------------- GET /movies/:movieId -------------------------------
   * Returns the searched element by ID
   */
  router.get(
    "/:movieId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { movieId } = req.params;
      const cu = useCasesFactory.cuFindElement();
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
     * --------------------------DELETE /movies/:movieId -------------------------------
     * Delete a movie from database 
     */
  router.delete(
    "/:movieId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async (req, res, next) => {
      const { movieId } = req.params;
      const cu = useCasesFactory.cuDeleteElement()
      await cu.deleteElement({
        type: "movie",
        value: movieId,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully remove movie from db"
      });
    })
  );
  /**
       * --------------------------POST /movies/:movieId/characters ---------------------
       * Creates a new character and asociate to a specific movie Id 
       */
  router.post(
    "/:movieId/characters",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { movieId } = req.params;
      const character = req.body

      const cu = useCasesFactory.cuUpdateElement()
      const characterAdded = await cu.update({
        type: "movie",
        id: movieId,
        action: "add",
        field: "character",
        value: character,
      });

      res.status(200).json({
        success: true,
        msg: "You successfully add character to a Movie",
        character: characterAdded,
      });
    })
  );

  /**
   * --------------------------DELETE /movies/:movieId/characters?characterId=xxxx -------------------------------
   * Remove Character From specific Movie (Id was provided)
   */
  router.delete("/:movieId/characters",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      console.log("paramsss", req.params)
      console.log("query", req.query)
      const { movieId } = req.params
      const { characterId } = req.query
      const cu = useCasesFactory.cuUpdateElement()
      const movieUpdated = await cu.update({
        type: "movie",
        id: movieId,
        action: "remove",
        field: "character",
        value: characterId,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully remove character from Movie",
        movie: movieUpdated,
      });
    }));

  /**
     * --------------------------PUT /movies/:movieId ---------------------
     * Updates a movie Field/s 
     */
  router.put(
    "/:movieId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { movieId } = req.params;
      const changes = req.body
      const cu = useCasesFactory.cuUpdateElement()
      const movieUpdated = await cu.update({
        type: "movie",
        id: movieId,
        action: "modify",
        field: "element",
        value: changes,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully update movie",
        movie: movieUpdated,
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
module.exports = { moviesHandler };

/**
 * ------------------ EXPRESS ASYNC WRAPPER -------------------
 * I can capture errors and throw it up
 */
let wrap =
  (fn) =>
    (...args) =>
      fn(...args).catch(args[2]);
