var passport = require("passport");
var LocalStrategy = require("passport-local");
const useCasesFactory = require("../useCases/useCasesFactory");
const validPassword = require("../utils/passwordUtils");

/**
 * ------------------ PASSPORT SERIALIZE -------------------
 */
passport.serializeUser((user, done) => {
  console.log("IN SEARILZeee:", user);
  return done(null, user.id);
});
/**
 * ------------------ PASSPORT DEserialize -------------------
 */
passport.deserializeUser(async (userId, done) => {
  console.log("IN DESEARILZEUSER:", userId);
  try {
    const cu = useCasesFactory.cuSearchElement();
    const user = await cu.search({ type: "user", field: "id", value: userId });
    if (user) {
      console.log("IN DESEARILZEUSER user encontrado");
      return done(null, user);
    }
  } catch (error) {
    console.log("IN DESEARILZEUSER error:", error);
    return done(error);
  }
});

/**
 * ---------------------------- PASSPORT REGISTER CALLBACK -----------------------
 */
const registerCallBack = async (req, username, password, done) => {
  try {
    console.log("EN registerCallBack...username Recibido:", username);
    console.log("EN registerCallBack...password Recibido:", password);
    const cu = useCasesFactory.cuRegister();
    const newUser = await cu.register({ username, password });
    if (!newUser) {
      return done(null, false, { message: "Couldnt register user" });
    }
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

/**
 * ---------------------------- PASSPORT LOGIN CALLBACK -----------------------
 */
const loginCallBack = async (req, username, password, done) => {
  try {
    console.log("EN LOGINCallBack...username Recibido:", username);
    const cu = useCasesFactory.cuLogin();
    const newUser = await cu.login({ username, password });
    if (!newUser) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};
/**
 * ------------------ CUSTOM FIELDS FOR PASSPORT -------------------
 */
const customFields = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

/**
 * ------------------ CONFIGURE PASSPORT STRATEGY-------------------
 */
const strategyRegister = new LocalStrategy(customFields, registerCallBack);
const strategyLogin = new LocalStrategy(customFields, loginCallBack);
passport.use("local-signup", strategyRegister);
passport.use("local-signin", strategyLogin);
