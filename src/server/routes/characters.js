const passport = require("passport");
const { configurations } = require("../../configurations/configs");
const {
  crearErrorArgumentosInvalidos,
  crearErrorUnauthorizedResource,
} = require("../../errors/errorsHandler");
const useCasesFactory = require("../../useCases/useCasesFactory");
const router = require("express").Router();
require("swagger-jsdoc")
require("swagger-ui-express")

function charactersHandler() {

  router.get("",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      console.log("QUERYYYYYYYS", req.query)

      const cu = useCasesFactory.cuGetList();
      const charactersList = await cu.get({
        type: "character",
        visibleFields: [],//empty array => list all
        queries: req.query,
      })

      res.status(200).json({
        success: true,
        msg: "You successfully request characters list",
        list: charactersList
      });
    })
  );
  /**
  * -------------------------- GET /characters/:characterId -------------------------------
  * Returns the searched element by ID
  */
  router.get(
    "/:characterId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { characterId } = req.params;
      const cu = useCasesFactory.cuFindElement();
      const character = await cu.find({
        type: "character",
        field: "id",
        value: characterId,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully request Character",
        character: character,
      });
    })
  );
  /**
      * --------------------------POST /characters -------------------------------
      * Creates a character and store it in database 
      */
  router.post(
    "",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async (req, res, next) => {
      const character = req.body;
      const cu = useCasesFactory.cuSaveElement();
      const newCharacter = await cu.saveElement({
        type: "character",
        value: character,
      });
      console.log("-----------ANTES DE ENVIAR", newCharacter);
      res.status(200).json({
        success: true,
        msg: "You successfully add a new Character",
        character: newCharacter,
      });
    })
  );
  /**
    * --------------------------DELETE /characters/:characterId -------------------------------
    * Delete a character from database 
    */
  router.delete(
    "/:characterId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async (req, res, next) => {
      const { characterId } = req.params;
      const cu = useCasesFactory.cuDeleteElement()
      await cu.deleteElement({
        type: "character",
        value: characterId,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully remove Character from db"
      });
    })
  );
  /**
       * --------------------------POST /characters/:characterId/movies ---------------------
       * Creates a new movie and asociate to a specific character Id 
       */
  router.post(
    "/:characterId/movies",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { characterId } = req.params;
      const movie = req.body
      //option 2 also could be sent:
      //{ movieId: 'a5f15175-7d27-4fe7-94dc-30b6db861150' } 
      const cu = useCasesFactory.cuUpdateElement()
      const movieAdded = await cu.update({
        type: "character",
        id: characterId,
        action: "add",
        field: "movie",
        value: movie,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully add Movie to a Character",
        movie: movieAdded,
      });
    })
  );
  /**
    * --------------------------DELETE /characters/:characterId/movies?movieId=xxxx -------------------------------
    * Remove Movie From specific Character (Id was provided)
    */
  router.delete("/:characterId/movies",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      console.log("paramsss", req.params)
      console.log("query", req.query)
      const { characterId } = req.params
      const { movieId } = req.query
      const cu = useCasesFactory.cuUpdateElement()
      const characterUpdated = await cu.update({
        type: "character",
        id: characterId,
        action: "remove",
        field: "movie",
        value: movieId,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully remove character from Movie",
        character: characterUpdated,
      });
    }));
  /**
   * --------------------------PUT /characters/:characterId ---------------------
   * Updates a character Field/s 
   */
  router.put(
    "/:characterId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { characterId } = req.params;
      const changes = req.body
      const cu = useCasesFactory.cuUpdateElement()
      const characterUpdated = await cu.update({
        type: "character",
        id: characterId,
        action: "modify",
        field: "element",
        value: changes,
      });
      res.status(200).json({
        success: true,
        msg: "You successfully update character",
        movie: characterUpdated,
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
/**
 * ------------------ EXPRESS ASYNC WRAPPER -------------------
 * This function let us handle some error in server and catch them
 */
let wrap =
  (fn) =>
    (...args) =>
      fn(...args).catch(args[2]);


module.exports = { charactersHandler };

