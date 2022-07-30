const {
  crearErrorRecursoNoEncontrado,
  crearErrorArgumentosInvalidos,
} = require("../../src/errors/errorsHandler");
const { recoverUserModel } = require("../models/userModel");
const userSchemaModel = require("./daoModels/userMongooseSchema");

/**
 *  --------------------------------------- DAO USERS MONGO --------------------------------------
 * I use DAO pattern, Factory and Singleton pattern for performance in this app
 * This Dao will work if you change configurations file. This Dao is not 100% complete, you can add
 * another functions later, like remove users or get all users for example.
 */
let daoUsersMongo = (function () {
  let instance;

  function create() {
    return {
      addUser: async (user) => {
        let userMongo
        userMongo = await userSchemaModel
          .findOne({ username: user.username })
          .exec();
        if (userMongo) {
          throw crearErrorArgumentosInvalidos(
            "username",
            "username alredy exists"
          );
        }
        const userNew = new userSchemaModel(user);
        await userNew.save();
        return user;
      },
      getUserById: async (id) => {
        const idBuscado = id.toString();
        const userMongo = await userSchemaModel
          .findOne({ id: idBuscado })
          .exec();
        if (!userMongo) {
          throw crearErrorRecursoNoEncontrado("usuario", idBuscado);
        }
        const usuario = recoverUserModel(userMongo);
        return usuario;
      },
      getUserByUsername: async (username) => {
        const userMongo = await userSchemaModel.findOne({ username }).exec();
        if (!userMongo) {
          throw crearErrorRecursoNoEncontrado("usuario", username);
        }
        const usuario = recoverUserModel(userMongo);
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

module.exports = daoUsersMongo;
