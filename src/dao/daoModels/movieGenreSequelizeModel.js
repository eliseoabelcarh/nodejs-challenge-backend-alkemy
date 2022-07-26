const Sequelize = require("sequelize");
const connectSequelize = require("../../database/connectionSequelize");

 function movieGenreSequelizeModel(sequelize) {
    
  //const sequelize = await (await connectionSequelize).getInstance()
  // const seq = await connectSequelize
  // const sequelize = await seq.getInstance()
  //Define model
  const movieGenreSequelizeModel = sequelize.define("movieGenre", {
    id: { type: Sequelize.STRING, primaryKey: true },
    nombre: Sequelize.STRING,
    imagen: Sequelize.STRING,
    peliculasIds:Sequelize.ARRAY(Sequelize.STRING)
  });
  //The call to movieGenreSequelizeModel.sync() above will cause Sequelize to synchronize the model with the database.
 // await movieGenreSequelizeModel.sync();
  return movieGenreSequelizeModel;

}

module.exports = { movieGenreSequelizeModel };