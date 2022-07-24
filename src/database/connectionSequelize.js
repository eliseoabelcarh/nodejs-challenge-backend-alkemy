const Sequelize = require("sequelize");






async function connectSequelize() {
  return new Promise(async (resolve, reject) => {

    console.log("--------En connect Seqelize")
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
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }


      //You can use sequelize.sync() to automatically synchronize all models. Example:
      await sequelize.sync({ force: false });



    //   const newUser = await userModel.create({
    //     id: "eeee",
    //     username: "3333",
    //     password: "ffff",
    //     salt: "ggggg",
    //   });
    //   console.log("neww user", JSON.stringify(newUser));

      resolve(sequelize);
    } catch (error) {
      console.log("Errro conectando a MysQL", error);
      reject(error);
    }
  });
}

module.exports = { connectSequelize };
