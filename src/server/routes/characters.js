const passport = require("passport");
const { configurations } = require("../../configurations/configs");
const {
  crearErrorArgumentosInvalidos,
  crearErrorUnauthorizedResource,
} = require("../../errors/errorsHandler");
const useCasesFactory = require("../../useCases/useCasesFactory");
const router = require("express").Router();

function charactersHandler() {
  /**
   * --------------------------GET /characters -------------------------------
   */
  router.get("", function (req, res, next) {
    res.status(200).json("koakka");
  });
   /**
   * -------------------------- GET /characters/:characterId -------------------------------
   * Returns the searched element by ID
   */
  router.get(
    "/:characterId",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      const { characterId } = req.params;
      const cu = useCasesFactory.cuSearchElement();
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
     * --------------------------POST /characters/:characterId/movies ---------------------
     * Creates a new movie and asociate to a especific character Id 
     */
  router.post(
    "/:characterId/movies",
    passport.authenticate("jwt-token", { session: false }),
    wrap(async function (req, res, next) {
      console.log("paraMMMMMMM", req.params);
      const { characterId } = req.params;
      const movie = req.body
      console.log("bodyEnviadooo", req.body);
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
   * ------------------------ TESTING ROUTE --------------------------
   */
  router.get(
    `/test`,
    wrap(async (req, res) => {
      res.status(200).send("okay");
    })
  );
  return router;
}
module.exports = { charactersHandler };

/**
 * ------------------ EXPRESS ASYNC WRAPPER -------------------
 * We can capture errors and throw it up
 */
let wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);
