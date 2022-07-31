const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
const { genPassword, validPassword } = require("../utils/passwordUtils");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

/**
 * ------------------------------------ USER MODEL ----------------------------------
 * This could be define as an JS Object to be consistent with all my developing work until now,
 * but I decide to make it with JS Classes just for change a little. The architecture and performance is
 * not affected, and if you change to another type of object, you can do it, and the only file
 * affected it was here.  
 */
class UserModel {
  constructor({ id, username, passwordHashed, salt }) {
    //This field ID is used for maintain full control about ids,REGARDLESS of the database we use
    this.id = id;
    this.username = username;
    this.password = passwordHashed;
    this.salt = salt;
  }
}
/**
 * ------------------------- CREATING USER ENCRYPTING PASSWORD AND USING SALT -------------------------------------
 *  In Utils Folder we can access to GenPassword Function for create a Salt and encrypt password
 *  I use also uuid module to create random IDs for save it in database
 */
function createUserModel(data) {
  validDataUsernameYPassword(data);
  const { username, password } = data;
  const id = uuidv4();
  const { salt, hash } = genPassword(password);
  const userModel = new UserModel({ id, username, passwordHashed: hash, salt });
  return userModel;
}

function passwordIsValid({ plainTextPassword, hashedPassword, salt }) {
  return validPassword(plainTextPassword, hashedPassword, salt);
}
/**
 * ------------------------- RECOVER FUNCTION -------------------------------------
 * This function is used to validate data, clean and recover fields when we get it from
 * any database. Especially if database add extra fields when save it in tables for SQL databases
 * or in objects for example in noSql databases cases for example. Some extra fields are:
 * createdAt, _id, uuid, etc
 */
function recoverUserModel(data) {
  validDataUsernameYPassword(data);
  if (!data.id) {
    throw crearErrorArgumentosInvalidos("id", "required field");
  }
  if (!data.salt) {
    throw crearErrorArgumentosInvalidos("salt", "required field");
  }
  const { id, username, password, salt } = data;
  const userModel = new UserModel({ id, username, passwordHashed: password, salt });
  return userModel;
}

function validDataUsernameYPassword(data) {
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
