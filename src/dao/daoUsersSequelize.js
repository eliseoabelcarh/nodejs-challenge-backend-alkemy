const {
  crearErrorRecursoNoEncontrado,
  crearErrorDeBaseDeDatos,
  crearErrorArgumentosInvalidos,
} = require("../../src/errors/errorsHandler");
const connectSequelize = require("../database/connectionSequelize");
const { createUserModel, recoverUserModel } = require("../models/userModel");
const { userSequelizeModel } = require("./daoModels/userSequelizeModel");

let daoUsersSequelize = (function () {
  let instance;

  function create() {
    
    return {
      addUser: async (user) => {
        const sequelize = await (await connectSequelize).getInstance()
        const userSeqModel = await userSequelizeModel(sequelize);
        console.log("en AdduserSequelize", user);
        let userInDB;
        // verifico que no existe username
        userInDB = await userSeqModel.findOne({
          where: { username: user.username },
        });
        console.log("userr n dbbbb", userInDB);
        if (userInDB != null) {
          throw crearErrorArgumentosInvalidos(
            "username",
            "username alredy exists"
          );
        }
        //if everything is ok, we save it in db
        const newUser =await userSeqModel.create({
          id: user.id,
          username: user.username,
          password: user.password,
          salt: user.salt,
        });
        console.log("neww user", JSON.stringify(newUser));
        return newUser;
      },
      getUserById: async (id) => {
        const sequelize = await (await connectSequelize).getInstance()
        const userSeqModel = await userSequelizeModel(sequelize);
        let userInDB;
        userInDB = await userSeqModel.findOne({ where: { id } });
        if (!userInDB) {
          throw crearErrorRecursoNoEncontrado("usuario", idBuscado);
        }
        console.log("user ennnn:",userInDB)
        const usuario = recoverUserModel(userInDB);
        return usuario
      },
      getUserByUsername: async (username) => {
        const sequelize = await (await connectSequelize).getInstance()
        const userSeqModel = await userSequelizeModel(sequelize);
        let userInDB;
        userInDB = await userSeqModel.findOne({ where: { username } });
        if (!userInDB) {
            throw crearErrorRecursoNoEncontrado("usuario", username);
          }
          const usuario = recoverUserModel(userInDB);
          //await desconectar()
          return usuario;
      },
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

module.exports = daoUsersSequelize;
