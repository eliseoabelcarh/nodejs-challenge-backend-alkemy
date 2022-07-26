const Sequelize = require("sequelize");

async function characterSequelizeModel(sequelize) {
    
  //const sequelize = await (await connectionSequelize).getInstance()
  // const seq = await connectSequelize
  // const sequelize = await seq.getInstance()
  //Define model
  const characterSequelizeModel = sequelize.define("character", {
    id: { type: Sequelize.STRING, primaryKey: true },
    imagen: Sequelize.STRING,
    nombre: Sequelize.STRING,
    edad: Sequelize.STRING,
    peso:Sequelize.STRING,
    historia:Sequelize.STRING,
    peliculasIds:Sequelize.ARRAY(Sequelize.STRING)
  });
  //The call to characterSequelizeModel.sync() above will cause Sequelize to synchronize the model with the database.
  await characterSequelizeModel.sync();
  return characterSequelizeModel;

}

module.exports = { characterSequelizeModel };
