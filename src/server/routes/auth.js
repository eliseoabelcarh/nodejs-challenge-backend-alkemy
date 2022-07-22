const passport = require("passport");
const { crearErrorArgumentosInvalidos } = require("../../errors/errorsHandler");
const router = require("express").Router();

function authHandler() {
  /**
   * ------------------------------ PROFILE ROUTE --------------------------
   */
  router.get(
    "/perfil",
    protectedRoute,
    wrap(async (req, res) => {
      req.session.usuario = "Juan";
      req.session.visits = req.session.visits ? ++req.session.visits : 1;
      console.log("is authenticated in Perfil: " + req.isAuthenticated());
      res.status(200).json({ visits: req.session.visits });
    })
  );
  /**
   * ----------------- CUSTOM MIDDLEWARE REDIRECT IF IS AUTHENTICATED -------------------------------
   */
  function redirectProfile(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/api/auth/perfil");
    }else{
      next();
    }
    
  }
  /**
   * ----------------- CUSTOM MIDDLEWARE PROTECTED ROUTE -------------------------------
   */
  function protectedRoute(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    }else{
       throw crearErrorUnauthorizedResource("Access to profile")
    }
  }
  /**
   * -------------------------- CUSTOM MIDDLEWARE VALIDATE CREDENTIALS -------------------------------
   */
  function validateCredentials(req, res, next) {
    const { username, password } = req.body;
    console.log("credentialsss userna", username);
    console.log("credentialsss passwo", password);
    if (!username && !password)
      throw crearErrorArgumentosInvalidos(
        "bad credentials",
        "no username or password"
      );
    if (!username)
      throw crearErrorArgumentosInvalidos(
        "bad credentials",
        "username missing"
      );
    if (!password)
      throw crearErrorArgumentosInvalidos(
        "bad credentials",
        "password missing"
      );
    next();
  }

  /**
   * -------------------------- REGISTER ROUTE -------------------------------
   */
  router.get("/register", redirectProfile, function (req, res, next) {
    res.render("signup", { what: "Register", who: "user" });
  });

  router.post(
    "/register",
    validateCredentials,
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
   * -------------------------- LOGIN ROUTE -------------------------------
   */
  router.get("/login", redirectProfile, function (req, res, next) {
    res.render("signin", { what: "Login", who: "user" });
  });

  router.post(
    "/login",
    validateCredentials,
    passport.authenticate("local-signin", {
      failureRedirect: "/error",
      failureFlash: true,
      passReqToCallback: true,
      failureMessage: true,
    }),
    function (req, res, next) {
      console.log("req obje", req.session);
      console.log("is authenticated?: " + req.isAuthenticated());
      res.redirect("/api/auth/perfil")
    }
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
