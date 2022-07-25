const Sequelize = require("sequelize");
const connectSequelize = require("../database/connectionSequelize");




async function characterSequelizeModel() {
    
  //const sequelize = await (await connectionSequelize).getInstance()
  const seq = await connectSequelize
  const sequelize = await seq.getInstance()
  //Define model
  const characterSequelizeModel = sequelize.define("characters", {
    id: { type: Sequelize.STRING, primaryKey: true },
    imagen: Sequelize.STRING,
    nombre: Sequelize.STRING,
    edad: Sequelize.STRING,
    peso:Sequelize.STRING,
    historia:Sequelize.STRING,
    peliculasOSeriesIds:Sequelize.ARRAY
  });
  //The call to characterSequelizeModel.sync() above will cause Sequelize to synchronize the model with the database.
  await characterSequelizeModel.sync();
  return characterSequelizeModel;

}

module.exports = { characterSequelizeModel };
