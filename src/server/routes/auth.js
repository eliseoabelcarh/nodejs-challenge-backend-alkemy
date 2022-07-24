const passport = require("passport");
const { configurations } = require("../../configurations/configs");
const {
  crearErrorArgumentosInvalidos,
  crearErrorUnauthorizedResource,
} = require("../../errors/errorsHandler");
const useCasesFactory = require("../../useCases/useCasesFactory");
const { issueJWT } = require("../../utils/passwordUtils");
const router = require("express").Router();

function authHandler() {
  /**
   * -------------------- GETTING STRATEGY AUTHENTICATION ----------------------
   * Defined in folder: 
   */
 
  const strategyAuth = configurations.getStrategyAuth()

  /**
   * ------------------------------ SUCCESS ROUTE --------------------------
   */
  router.get("/success", function (req, res, next) {
    res.json({ success: true, message: "success" });
  });

  /**
   * ------------------------------ PROFILE ROUTE FOR FRONTEND --------------------------
   * When you login with local strategy WITH FRONTEND FORM
   * you will access to this route using session cookies
   */
  router.get(
    "/profile",
    onlyAuthenticatedUsers,
    wrap(async (req, res) => {
      req.session.visits = req.session.visits ? ++req.session.visits : 1;
      console.log("is authenticated in profile: " + req.isAuthenticated());
      res.status(200).json({ visits: req.session.visits });
    })
  );
  // CUSTOM MIDDLEWARE PROTECTED ROUTE -
  function onlyAuthenticatedUsers(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      throw crearErrorUnauthorizedResource("Access to profile");
    }
  }

  /**
   * ------------------------------ PROTECTED JWT TOKEN TEST ROUTE --------------------------
   */
  router.get(
    "/protected",
    wrap((req, res, next) => {
      res.status(200).json({ message: "okay" });
    })
  );
  router.post(
    "/protected",
    passport.authenticate("jwt-token", { session: false }),
    (req, res, next) => {
      res.status(200).json({
        success: true,
        msg: "You are successfully JWT-TOKEN authenticated to this route!",
      });
    }
  );
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
   * ----------------- CUSTOM MIDDLEWARE REDIRECT IF IS AUTHENTICATED -------------------------------
   * For Local Passport Strategy Authentication
   * Works with cookie session authentication
   * You can see it in action using Frontend View Form
   */
  function redirectProfileIfIsAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/api/auth/profile");
    } else {
      next();
    }
  }
  /**
   * -------------------------- REGISTER STRATEGY -------------------------------
   */
  function getRegisterAuthenticationStrategy(strategy) {
    if (strategy === "local") {
      return passport.authenticate("local-signup", {
        failureRedirect: "/error",
        successRedirect: "/api/auth/success",
        failureFlash: true,
        passReqToCallback: true,
        failureMessage: true,
      });
    }
    if (strategy === "jwt") {
      return wrap(async function (req, res, next) {
        console.log("en registerrrrr post");
        // register user in DB
        try {
          const { username, password } = req.body;
          console.log(` recibidos body : ${req.body.username} ${password}`);
          const cu = useCasesFactory.cuRegister();
          const newUser = await cu.register({ username, password });
          if (newUser) {
            //generate JWT Token and send it to new user
            const { token, expiresIn } = issueJWT(newUser);
            res.json({ success: true, user: newUser, token, expiresIn });
          }
        } catch (error) {
          next(error);
        }
      });
    }
  }
  /**
   * -------------------------- REGISTER ROUTE -------------------------------
   */
  router.get(
    "/register",
    redirectProfileIfIsAuthenticated,
    function (req, res, next) {
      res.render("signup", { what: "Register", who: "user" });
    }
  );

  router.post(
    "/register",
    validateCredentials,
    getRegisterAuthenticationStrategy(strategyAuth)
  );

  /**
   * -------------------------- LOGIN STRATEGY -------------------------------
   */
  function getLoginAuthenticationStrategy(strategy) {
    if (strategy === "local") {
      return passport.authenticate("local-signin", {
        failureRedirect: "/error",
        successRedirect: "/api/auth/success",
        failureFlash: true,
        passReqToCallback: true,
        failureMessage: true,
      });
    }
    if (strategy === "jwt") {
      return wrap(async function (req, res, next) {
        try {
          const { username, password } = req.body;
          console.log(` recibidos login: ${req.body.username} ${password}`);
          const cu = useCasesFactory.cuLogin();
          const newUser = await cu.login({ username, password });
          if (newUser) {
            //generate JWT Token and send it to new user
            const { token, expiresIn } = issueJWT(newUser);
            res.json({ success: true, user: newUser, token, expiresIn });
          }
        } catch (error) {
          next(error);
        }
      });
    }
  }

  /**
   * -------------------------- LOGIN ROUTE -------------------------------
   */
  router.get(
    "/login",
    redirectProfileIfIsAuthenticated,
    function (req, res, next) {
      res.render("signin", { what: "Login", who: "user" });
    }
  );
  router.post(
    "/login",
    validateCredentials,
    getLoginAuthenticationStrategy(strategyAuth)
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
