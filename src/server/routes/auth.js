const passport = require("passport");
const router = require("express").Router();


function authHandler() {
  /**
   * ------------------------------ PROFILE ROUTE --------------------------
   */
  router.get(
    "/perfil",
    wrap(async (req, res) => {
      req.session.usuario = "Juan";
      req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
      console.log("is authenticated in Perfil: " + req.isAuthenticated());
      res.send(
        `usuario ${req.session.usuario} visitó ${req.session.visitas} veces`
      );
    })
  );

  /**
   * -------------------------- REGISTER ROUTE -------------------------------
   */
  router.get("/register", function (req, res, next) {
    res.render("index", { what: "best", who: "me", baseUrl: req.baseUrl });
  });

  router.post(
    "/register",
    passport.authenticate("local-signup", {
      failureRedirect: "/error",
      failureFlash: true,
      passReqToCallback: true,
      failureMessage: true,
    }),
    function (req, res) {
      console.log("req obje", req.session);
      console.log("is authenticated?: " + req.isAuthenticated());
      res.redirect("/api/auth/perfil");
    }
  );

  /**
   * ------------------------------ ERROR ROUTE ----------------------------
   */
  router.get(
    "/error",
    wrap(async (req, res, next) => {
      console.log("ERROR page");
      res.status(200).send("error page");
    })
  );

  return router;
}

module.exports = { authHandler };

/**
 * ------------------ EXPRESS ASYNC WRAPPER -------------------
 */
let wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);
