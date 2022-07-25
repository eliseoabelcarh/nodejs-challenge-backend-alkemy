const {
    crearErrorRecursoNoEncontrado,
    crearErrorDeBaseDeDatos,
    crearErrorArgumentosInvalidos,
  } = require("../../src/errors/errorsHandler");
  const connectSequelize = require("../database/connectionSequelize");
  const { createUserModel, recoverUserModel } = require("../models/userModel");
  const { userSequelizeModel } = require("./daoModels/userSequelizeModel");
  
  let daoElementsSequelize = (function () {
    let instance;
  
    function create() {
      
      return {
        addCharacter: async (character) => {

            console.log("elemento guardadddddoooo")
          return character;
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
  
  module.exports = daoElementsSequelize;
  