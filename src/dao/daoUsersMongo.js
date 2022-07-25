const {
  crearErrorRecursoNoEncontrado,
  crearErrorDeBaseDeDatos,
  crearErrorArgumentosInvalidos,
} = require("../../src/errors/errorsHandler");
const { recoverUserModel } = require("../models/userModel");
const userSchemaModel = require("./daoModels/userMongooseSchema");

let daoUsersMongo = (function () {
  let instance;

  function create() {
    return {
      addUser: async (user) => {
        let userMongo
        console.log("en Adduser", user);
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
        console.log("en Adduser-user saved", user);
        return user;
      },
      getUserById: async (id) => {
        console.log("en getuserbyID", id);
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
        console.log("en getUserByUsername", username);
        const userMongo = await userSchemaModel.findOne({ username }).exec();
        if (!userMongo) {
          throw crearErrorRecursoNoEncontrado("usuario", username);
        }
        const usuario = recoverUserModel(userMongo);
        return usuario;
      },

      // cleanAll: async () => {
      //     await userSchemaModel.deleteMany({});
      // },
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
