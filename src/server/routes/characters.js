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
  router.post(
    "/characters",
    passport.authenticate("jwt-token", { session: false }),
    (req, res, next) => {
      const character = req.body
      console.log("charactere3e3", req.body)



      res.status(200).json({
        success: true,
        msg: "You are successfully JWT-TOKEN!",
      });
    }

    
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
 */
let wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);
