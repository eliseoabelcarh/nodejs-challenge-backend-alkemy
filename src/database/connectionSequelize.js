const Sequelize = require("sequelize");
const { crearErrorDeBaseDeDatos } = require("../errors/errorsHandler");
require("dotenv").config();

/**
 * ----------------------------------- SEQUELIZE CONNECTION DATABASE------------------------------
 * I configure database options, i will use it for users and elements operations.
 * This made by using SINGLETON pattern for performance and elements handling
 */
const connectSequelize = (async function () {
  let instance;
  async function create() {
    try {
      const database = process.env.DATABASE_POSTGRES;
      const userDB = process.env.USER_DATABASE_POSTGRES;
      const passwordDB = process.env.PASSWORD_DB_POSTGRES;
      //Define database connection params
      const sequelize = new Sequelize(database, userDB, passwordDB, {
        host: process.env.DATABASE_HOST_SEQUELIZE,
        dialect: process.env.DIALECT_SEQUELIZE,
      })
      return sequelize;
    } catch (error) {
      console.log("Error connecting a database", error);
      throw crearErrorDeBaseDeDatos("connection Sequelize founded");
    }
  }

  return {
    getInstance: async function () {
      if (!instance) {
        instance = await create();
        //You can use sequelize.sync() to automatically synchronize all models.
        // this is recommended because your using associations between models
        await instance.sync({ force: false });
      }
      return instance;
    },
  };
})();

module.exports = connectSequelize;
