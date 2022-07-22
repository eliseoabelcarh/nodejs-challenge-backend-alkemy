const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
const { genPassword, validPassword } = require("../utils/passwordUtils");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

class UserModel {
  constructor({ id, username, passwordHashed, salt }) {
    this.id = id;
    this.username = username;
    this.password = passwordHashed;
    this.salt = salt;
  }
}

function createUserModel(data) {
  validData(data);
  const { username, password } = data;
  const id = uuidv4();
  const { salt, hash } = genPassword(password);
  console.log("creando..",{  salt, hash } )
  const userModel = new UserModel({ id, username, passwordHashed:hash, salt });
  console.log("createee", userModel);
  return userModel;
}

function passwordIsValid({ plainTextPassword, hashedPassword, salt }) {
  return validPassword(plainTextPassword, hashedPassword, salt);
}

function recoverUserModel(data) {
  validData(data);
  if (!data.id) {
    throw crearErrorArgumentosInvalidos("id", "required field");
  }
  if (!data.salt) {
    throw crearErrorArgumentosInvalidos("salt", "required field");
  }
  const { id, username, password, salt } = data;
  const userModel = new UserModel({ id, username, passwordHashed:password, salt });
  return userModel;
}

function validData(data) {
  if (!data || Object.keys(data).length === 0) {
    throw crearErrorArgumentosInvalidos("empty data", "no arguments provided");
  }
  if (!data.username) {
    throw crearErrorArgumentosInvalidos("username", "required field");
  }
  if (!data.password) {
    throw crearErrorArgumentosInvalidos("password", "required field");
  }
}

module.exports = {
  createUserModel,
  recoverUserModel,
  passwordIsValid
};
