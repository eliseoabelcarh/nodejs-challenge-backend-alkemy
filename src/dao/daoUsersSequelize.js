const {
  crearErrorRecursoNoEncontrado,
  crearErrorArgumentosInvalidos,
} = require("../../src/errors/errorsHandler");
const { getSequelizeModels } = require("../database/sequelizeModels");
const {  recoverUserModel } = require("../models/userModel");


/**
 * ------------------------------ DAO USERS: DATA ACCESS OBJECT PATTERN-------------------------------
 * This pattern will provide an abstract interface for persistence mechanism
 * I use SINGLETON PATTERN too: is a software design pattern that restricts
 * the instantiation of a class to one "single" instance 
 */

let daoUsersSequelize = (function () {
  let instance;

  function create() {
    
    return {
      addUser: async (user) => {
        const { userSeqModel } = await getSequelizeModels();
        await userSeqModel.sync()
        let userInDB;
        // Check if username already exists in db
        userInDB = await userSeqModel.findOne({
          where: { username: user.username },
        });
        if (userInDB != null) {
          throw crearErrorArgumentosInvalidos(
            "username",
            "username alredy exists"
          );
        }
        //if everything is ok, I save it in db
        const newUser =await userSeqModel.create({
          id: user.id,
          username: user.username,
          password: user.password,
          salt: user.salt,
        });
        return newUser;
      },
      getUserById: async (id) => {
        const { userSeqModel } = await getSequelizeModels();
        let userInDB;
        userInDB = await userSeqModel.findOne({ where: { id } });
        if (!userInDB) {
          throw crearErrorRecursoNoEncontrado("usuario", id);
        }
        const usuario = recoverUserModel(userInDB);
        return usuario
      },
      getUserByUsername: async (username) => {
        const { userSeqModel } = await getSequelizeModels();
        let userInDB;
        userInDB = await userSeqModel.findOne({ where: { username } });
        if (!userInDB) {
            throw crearErrorRecursoNoEncontrado("usuario", username);
          }
          const usuario = recoverUserModel(userInDB);
          return usuario;
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = create();
      }
      return instance;
    },
  };
})();

module.exports = daoUsersSequelize;
