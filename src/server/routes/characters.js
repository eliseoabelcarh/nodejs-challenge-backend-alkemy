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
   * -------------------------- CHARACTERS ROUTE -------------------------------
   */
  router.get("/characters", function (req, res, next) {
    res.status(200).json("koakka");
  });
  router.get("/characters/:characterId",async function (req, res, next) {
    console.log("parammmmssss",req.params)
    const {characterId} = req.params
    const cu = useCasesFactory.cuSearchElement()
    const character = await cu.find({type:"character",field:"id",value:characterId})
    console.log("charactrerr", character)
    res.status(200).json({
      success: true,
      msg: "You successfully request Character",
      character: "resultado"
    });
  });


  router.post(
    "/characters",
    passport.authenticate("jwt-token", { session: false }),

    wrap(async (req, res, next) => {
      const character = req.body;
      console.log("charactere3e3", req.body);

      const cu = useCasesFactory.cuSaveElement();
      const newCharacter = await cu.saveElement({
        type: "character",
        value: character,
      });
      console.log("-----------ANTES DE ENVIAR",newCharacter)
      res.status(200).json({
        success: true,
        msg: "You successfully add a new Character",
        character: newCharacter
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
