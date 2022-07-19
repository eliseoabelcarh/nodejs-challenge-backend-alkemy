const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require('uuid');
  // How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 
 
class UserModel {
  constructor({ username, password }) {
    this.id = uuidv4();
    this.username = username
    this.password = password
  }
}

function createUserModel(data) {
  if (!data || Object.keys(data).length === 0) {
    throw crearErrorArgumentosInvalidos("empty data", "no arguments provided");
  }
  if (!data.username ) {
    throw crearErrorArgumentosInvalidos("username", "required field");
  }
  if (!data.password) {
    throw crearErrorArgumentosInvalidos("password", "required field");
  }
console.log("createee", new UserModel(data))
  return new UserModel(data);
}

module.exports = {
    createUserModel,
};
