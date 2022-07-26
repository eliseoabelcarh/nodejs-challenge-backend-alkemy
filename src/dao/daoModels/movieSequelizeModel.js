const Sequelize = require("sequelize");
const connectSequelize = require("../../database/connectionSequelize");

 function movieSequelizeModel(sequelize) {
    
  //const sequelize = await (await connectionSequelize).getInstance()
  // const seq = await connectSequelize
  // const sequelize = await seq.getInstance()
  //Define model
  const movieSequelizeModel = sequelize.define("movie", {
    id: { type: Sequelize.STRING, primaryKey: true },
    imagen: Sequelize.STRING,
    titulo: Sequelize.STRING,
    fechaCreacion: Sequelize.STRING,
    calificacion:Sequelize.INTEGER,
    personajesIds:Sequelize.ARRAY(Sequelize.STRING),
    movieGenreId:Sequelize.STRING
  });
  //The call to movieSequelizeModel.sync() above will cause Sequelize to synchronize the model with the database.
  //await movieSequelizeModel.sync();
  return movieSequelizeModel;

}

module.exports = { movieSequelizeModel };
