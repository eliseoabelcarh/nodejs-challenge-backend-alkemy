var passport = require("passport");
var LocalStrategy = require("passport-local");
var JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const useCasesFactory = require("../useCases/useCasesFactory");


/**
 * -------------- REQUIRED FOR CREATE PUBLIC ENCRYPTED KEY ----------------------
 */
const path = require("path");
const fs = require("fs");
const pathTokey = path.join(__dirname, "..", "/utils/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathTokey, "utf8");


/**
 * 
 *  ----------------------------  STARTS JWT PASSPORT STRATEGY --------------------------
 * You can use only one Strategy for Authentication (configurations Folder)
 * You have to choose between Local with session cookies or JWT Token
 * This API is complete using JWT Strategy, some function are useless for Local Authentication
 *   
 */
// WARNING!!! You have to create a new pair of Keys running generateKeyPair.js
// The already keys pair created are for TESTING PURPOSING ONLY
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const jwtCallback = async (payload, done) => {
  const userId = payload.sub;
  try {
    const cu = useCasesFactory.cuFindElement();
    const user = await cu.find({ type: "user", field: "id", value: userId });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
};

/**
 * 
 * -----------------------------  STARTS LOCAL PASSPORT STRATEGY -----------------------------------
 * You can use only one Strategy for Authentication (configurations Folder)
 * You have to choose between Local with session cookies or JWT Token
 * This API is complete using JWT Strategy, some function are useless for Local Authentication
 */

/**
 * ------------------ PASSPORT LOCAL SERIALIZE -------------------
 */
passport.serializeUser((user, done) => {
  return done(null, user.id);
});
/**
 * ------------------ PASSPORT LOCAL DEserialize -------------------
 */
passport.deserializeUser(async (userId, done) => {
  try {
    const cu = useCasesFactory.cuFindElement();
    const user = await cu.find({ type: "user", field: "id", value: userId });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
});

/**
 * ---------------------------- PASSPORT REGISTER CALLBACK -----------------------
 */
const registerCallBack = async (req, username, password, done) => {
  try {
    // This part is for save user in database, a specific "storer" object handle it
    const cu = useCasesFactory.cuSaveElement();
    const newUser = await cu.saveElement({ type: "newUser", value: { username, password } });
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
    // This part is for find user in database, a specific "finder" object handle it
    // internally useCaseLoginUser handle if is valid user or not
    const cu = useCasesFactory.cuLogin();
    const newUser = await cu.login({ username, password });
    if (!newUser) {
      return done(null, false, { message: "Incorrect user or password." });
    }
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};
/**
 * ------------------ CUSTOM FIELDS FOR LOCAL PASSPORT STRATEGY -------------------
 */
const customFields = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

/**
 * ------------------ CONFIGURE PASSPORT LOCAL STRATEGY-------------------
 */
const strategyRegister = new LocalStrategy(customFields, registerCallBack);
const strategyLogin = new LocalStrategy(customFields, loginCallBack);
passport.use("local-signup", strategyRegister);
passport.use("local-signin", strategyLogin);
/**
 * ------------------ CONFIGURE PASSPORT JWT STRATEGY-------------------
 */
const jwtStrategy = new JwtStrategy(options, jwtCallback);
passport.use("jwt-token", jwtStrategy);
