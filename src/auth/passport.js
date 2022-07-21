var passport = require("passport");
var LocalStrategy = require("passport-local");
const useCasesFactory = require("../useCases/useCasesFactory");

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
    const cu = useCasesFactory.cuRegister();
    const newUser = await cu.register({ username, password });
    if (!newUser) {
      return done(null, false, { message: "Incorrect username or password." });
    }
    // const isValid = await validPassword(password,user.hash,user.salt)
    const isValid = true;
    if (isValid && newUser) {
      console.log("all validdd");
      return done(null, newUser);
    } else {
      return done(null, false);
    }
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
const strategy = new LocalStrategy(customFields, registerCallBack);
passport.use("local-signup", strategy);
