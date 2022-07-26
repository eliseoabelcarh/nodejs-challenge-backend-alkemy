const Sequelize = require("sequelize");
const { crearErrorDeBaseDeDatos } = require("../errors/errorsHandler");




const connectSequelize = (async function () {
  let instance;
  async function create() {
    try {
       //option1: "postgres" - option2: "mydatabase"
      const database = "postgres";
      //option1: "postgres" - option2: "abel"
      const userDB = "postgres";
      const passwordDB = "alpaca2462";
      //Define database connection params
      const sequelize = new Sequelize(database, userDB, passwordDB, {
        host: "localhost",
        //option1: "postgres" - option2: "mysql"
        dialect: "postgres", 
      })
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
        //Create models asociations and relationships
        
        //You can use sequelize.sync() to automatically synchronize all models. Example:
        await instance.sync({ force: false });
      }
      return instance;
    },
  };
})();

module.exports = connectSequelize;
