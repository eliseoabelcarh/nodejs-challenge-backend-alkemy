const Sequelize = require("sequelize");
const { crearErrorDeBaseDeDatos } = require("../errors/errorsHandler");

const connectSequelize = (async function () {
  let instance;
  async function create() {
    try {
      const database = "mydatabase";
      const userDB = "abel";
      const passwordDB = "alpaca2462";
      //Define database connection params
      const sequelize = new Sequelize(database, userDB, passwordDB, {
        host: "localhost",
        dialect: "mysql",
      });

      //You can use the .authenticate() function to test if the connection is OK:
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      //You can use sequelize.sync() to automatically synchronize all models. Example:
      await sequelize.sync({ force: false });

      return sequelize;
    } catch (error) {
      console.log("Errro conectando a MysQL", error);
      throw crearErrorDeBaseDeDatos("conection Sequelize founded");
    }
  }

  return {
    getInstance: async function () {
      if (!instance) {
        instance = await create();
      }
      return instance;
    },
  };
})();

module.exports = connectSequelize;
