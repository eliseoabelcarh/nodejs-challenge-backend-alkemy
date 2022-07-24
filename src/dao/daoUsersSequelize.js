const {
  crearErrorRecursoNoEncontrado,
  crearErrorDeBaseDeDatos,
  crearErrorArgumentosInvalidos,
} = require("../../src/errors/errorsHandler");
const { createUserModel, recoverUserModel } = require("../models/userModel");
const { userSequelizeModel } = require("./userSequelizeModel");

let daoUsersMongo = (function () {
  let instance;

  function create(config) {
    return {
      addUser: async (user) => {
        console.log("en AdduserSequelize", user);
        let userInDB;
        //verifico que no existe id
        userInDB = "";
        if (userInDB) {
          throw crearErrorArgumentosInvalidos("id", "id already exists");
        }
        // verifico que no existe username
        if (userInDB) {
          throw crearErrorArgumentosInvalidos(
            "username",
            "username alredy exists"
          );
        }
        //if everything is ok, we save it in db
        const userSeqModel = await userSequelizeModel();
        const newUser = userSeqModel.create({
          id: user.id,
          username: user.username,
          password: user.password,
          salt: user.salt,
        });
        console.log("neww user", JSON.stringify(newUser));
        return newUser;
      },
      getUserById: async (id) => {},
      getUserByUsername: async (username) => {},
    };
  }

  return {
    getInstance: function (config) {
      if (!instance) {
        instance = create(config);
      }
      return instance;
    },
  };
})();

module.exports = daoUsersMongo;
