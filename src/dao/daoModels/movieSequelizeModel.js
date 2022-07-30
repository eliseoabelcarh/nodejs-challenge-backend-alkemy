const Sequelize = require("sequelize");

function movieSequelizeModel(sequelize) {
  /**
    * ---------------------- MOVIE SEQUELIZE MODEL --------------------------------------
    * I Define model for doing later an association many-to-many between movie model and character model 
    * This model also will have an association one-to-many with movieGenre model
    */
  const movieSequelizeModel = sequelize.define("movie", {
    id: { type: Sequelize.STRING, primaryKey: true },
    imagen: Sequelize.STRING,
    titulo: Sequelize.STRING,
    fechaCreacion: Sequelize.STRING,
    calificacion: Sequelize.INTEGER,
  });
  return movieSequelizeModel;
}

module.exports = { movieSequelizeModel };
