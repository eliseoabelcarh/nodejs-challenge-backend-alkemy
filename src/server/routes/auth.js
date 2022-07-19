const { crearErrorArgumentosInvalidos } = require("../../errors/errorsHandler");
const { createUserModel } = require("../../models/userModel");
const useCasesFactory = require("../../useCases/useCasesFactory");

let wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);

function authHandler() {
  const router = require("express").Router();

  router.post(
    "/register",
    wrap(async (req, res) => {
      const cu = useCasesFactory.cuRegister()
      const userIdCreated = await cu.register(req)
      res.status(200).json({id:userIdCreated})
    })
  );

  return router
}

module.exports = { authHandler };
