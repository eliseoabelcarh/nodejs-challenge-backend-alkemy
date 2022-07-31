const passport = require("passport");
const { configurations } = require("../../configurations/configs");
const {
  crearErrorArgumentosInvalidos,
  crearErrorUnauthorizedResource,
} = require("../../errors/errorsHandler");
const { issueJWT } = require("../../utils/passwordUtils");
const useCasesFactory = require("../../useCases/useCasesFactory");
const router = require("express").Router();

function authHandler() {
  /**
   * -------------------- GETTING STRATEGY AUTHENTICATION ----------------------
   * Defined in Configurations folder
   * You can choose between Local Strategy or JWT Authentication
   * By default JWT is set it. Most of endpoints are JWT authentication protected
   * So many this API endpoints are useless with Local Strategy 
   */
  const strategyAuth = configurations.getStrategyAuth();

  /**
   * ------------------------------ SUCCESS ROUTE ---------------------------
   * This endpoint is use it for redirect users when register or login success
   * Is valid only for Local Strategy Authentication
   * For JWT authentication stays in the same URL
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
   * This endpoints was created only for Testing purposes. You can see 
   * JWT Authentication doing his job, you have to send a JWT Bearer Token
   * If you want to remove it, you can do that, but you will have to remove 
   * some tests too. (... just one)
   */
  router.get(
    "/protected", // this endpoint has no authentication restrictions
    wrap((req, res, next) => {
      res.status(200).json({ message: "okay" });
    })
  );
  router.post(
    "/protected",
    passport.authenticate("jwt-token", { session: false }),//This is the authentication restriction part
    (req, res, next) => {
      res.status(200).json({
        success: true,
        msg: "You are successfully JWT-TOKEN authenticated to this route!",
      });
    }
  );
  /**
   * -------------------------- CUSTOM MIDDLEWARE VALIDATE CREDENTIALS -----------------------------
   * This middleware let me handle possible errors when receive data from user
   * There are other internal errors handlers inside modules and for each use cases
   */
  function validateCredentials(req, res, next) {
    const { username, password } = req.body;
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
 * -------------------------- REGISTER ROUTE -------------------------------
 */
  // This endpoint GET /register is configured for Local Authentication Strategy only
  // This will show a frontend with a Form with username and password fields.
  // Only redirect "success" to profile endpoint if Local Strategy is Enable
  // For JWT Strategy is useless, because we send object in body request in POST endpoint
  router.get(
    "/register",
    redirectProfileIfIsAuthenticated,
    function (req, res, next) {
      res.render("signup", { what: "Register", who: "user" });
    }
  );
  // This endpoint POST /register is configured for both Strategies
  // This will get the Authentication Strategy according Configurations file
  router.post(
    "/register",
    validateCredentials,
    getRegisterAuthenticationStrategy(strategyAuth)
  );
  /**
    * -------------------------- LOGIN ROUTE -------------------------------
    */
  // This endpoint GET /login is configured for Local Authentication Strategy only
  // This will show a frontend with a Form with username and password fields.
  // Only redirect "success" to profile endpoint if Local Strategy is Enable
  // For JWT Strategy is useless, because we send object in body request in POST endpoint
  router.get(
    "/login",
    redirectProfileIfIsAuthenticated,
    function (req, res, next) {
      res.render("signin", { what: "Login", who: "user" });
    }
  );
  // This endpoint POST /register is configured for both Strategies
  // This will get the Authentication Strategy according Configurations file
  router.post(
    "/login",
    validateCredentials,
    getLoginAuthenticationStrategy(strategyAuth)
  );


  /**
   * --------------------------------- REGISTER STRATEGY ------------------------------------
   *  According Configurations File, determine what stratregy will use
   */
  function getRegisterAuthenticationStrategy(strategy) {
    /**
     * ------------- if LOCAL STRATEGY is enabled ----------
     */
    if (strategy === "local") {
      return passport.authenticate("local-signup", {
        failureRedirect: "/error",
        successRedirect: "/api/auth/success",
        failureFlash: true,
        passReqToCallback: true,
        failureMessage: true,
      });
    }
    /**
     * ------------- if JWT STRATEGY is enabled-------------
     */
    if (strategy === "jwt") {
      return wrap(async function (req, res, next) {
        try {
          const { username, password } = req.body;
          //This part creates a new user and save it in  database
          const cu = useCasesFactory.cuSaveElement();
          const newUser = await cu.saveElement({ type: "newUser", value: { username, password } });
          if (newUser) {
            //generates a new JWT Token and sends it to the new user
            const { token, expiresIn } = issueJWT(newUser);
            /**
             * ------------ SEND EMAIL TO USER ---------------------------
             * sends an email with Token
             * If no configuration is set, Nodemailer module will use it
             * otherwise you can use Sendgrid service too, you have
             * to enable it in configuration file, both are perfectly tested
             */
            if(configurations.emailSenderIsEnable()){
               await sendEmailOnJWTAuthenticationSuccess(newUser.username, token);
            }
            res.json({ success: true, user: newUser, token, expiresIn });
          }
        } catch (error) {
          next(error);
        }
      });
    }
  }
  /**
   * SEND EMAIL FUNCTION ON JWT AUTHENTICATION SUCCESS ----------
   */
  async function sendEmailOnJWTAuthenticationSuccess(emailTo, token) {
    //You can add HTML text if you want. This is valid for Nodemailer and Sendgrid options.
    // From:[Email] parameter is optional, you can send it here, but is nor recommended configure it here
    const textEmail = `<strong>Your Authentication TOKEN is:</strong> ${token}`;
    const email = {
      to: emailTo,
      subject: `-Success Register ${emailTo}`,
      text: textEmail,
      //Attachments Array options is 100% running and working, you can set a path route for your files
      // This is an example: attachments: ["./test/emailSender/ejemplo.pdf"]}
      //You can see it in Tests folder for see it how it works.
      attachments: [
        /**"./test/emailSender/ejemplo.pdf"*/
      ],
    };
    const cuEmail = await useCasesFactory.cuSendEmail(email);
    await cuEmail.send(email);
  }

  /**
   * -------------------------- LOGIN STRATEGY -------------------------------
   * According Configurations File, determine what stratregy will use
   */
  /**
    * ------------- if LOCAL STRATEGY is enabled ----------
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
    /**
   * ------------- if JWT STRATEGY is enabled-------------
   */
    if (strategy === "jwt") {
      return wrap(async function (req, res, next) {
        try {
          const { username, password } = req.body;
          // This part Login user find him/her in database using a Finder Object
          const cu = useCasesFactory.cuLogin();
          const newUser = await cu.login({ username, password });
          if (newUser) {
            //generates a new JWT Token and sends it to the new user
            const { token, expiresIn } = issueJWT(newUser);
            /**
             * ------------ SEND EMAIL TO USER ---------------------------
             * sends an email with Token
             * If no configuration is set, Nodemailer module will use it
             * otherwise you can use Sendgrid service too, you have
             * to enable it in configuration file, both are perfectly tested
             */
             if(configurations.emailSenderIsEnable()){
              await sendEmailOnJWTAuthenticationSuccess(newUser.username, token);
             }
            //
            //
            res.json({ success: true, user: newUser, token, expiresIn });
          }
        } catch (error) {
          next(error);
        }
      });
    }
  }

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



module.exports = { authHandler };

