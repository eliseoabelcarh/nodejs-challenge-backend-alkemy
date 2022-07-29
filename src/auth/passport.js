var passport = require("passport");
var LocalStrategy = require("passport-local");
var JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const useCasesFactory = require("../useCases/useCasesFactory");
const path = require("path");
const fs = require("fs");

const pathTokey = path.join(__dirname, "..", "/utils/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathTokey, "utf8");


/**
 * 
 * STARTS JWT PASSPORT STRATEGY
 *   
 */

/**
 * OPTIONS AVAILABLE IN CASE YOU NEED IT
 */
// const passportJWTOptions = {
//     jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey:PUB_KEY || "secret phrase",
//     audience:"entre audience here",
//     algorithms:["RS256"],
//     ignoreExpiration:false,
//     passReqToCallback: false,
//     jsonWebTokenOptions:{
//         complete:false,
//         clockTolerance:"",
//         maxAge:"2d",
//         clockTimestamp:"100",
//         nonce:"string here for OpenID"
//     }
// }

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const jwtCallback = async (payload, done) => {
  console.log("IN JWT Strategy ...");
  const userId = payload.sub;
  try {
    const cu = useCasesFactory.cuFindElement();
    const user = await cu.find({ type: "user", field: "id", value: userId });
    console.log("userrr ene JWTTT", user)
    if (user) {
      console.log("IN JWT Strategy user encontrado");
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.log("N JWT Strategy  error:", error);
    return done(error);
  }
};



/**
 * 
 * STARTS LOCAL PASSPORT STRATEGY
 *   
 */

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
    const cu = useCasesFactory.cuFindElement();
    const user = await cu.find({ type: "user", field: "id", value: userId });
    if (user) {
      console.log("IN DESEARILZEUSER user encontrado");
      return done(null, user);
    } else {
      return done(null, false);
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
    const cu = useCasesFactory.cuSaveElement();
    const newUser = await cu.saveElement({type: "newUser",value: {username, password} });
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
