const Sequelize = require("sequelize");

function movieGenreSequelizeModel(sequelize) {
  /**
    * ---------------------- MOVIE GENRE SEQUELIZE MODEL --------------------------------------
    * I Define model for doing later an association one-to-many between movie model and movieGenre model 
    */
  const movieGenreSequelizeModel = sequelize.define("movieGenre", {
    id: { type: Sequelize.STRING, primaryKey: true },
    nombre: Sequelize.STRING,
    imagen: Sequelize.STRING,
  });
  return movieGenreSequelizeModel;
}

module.exports = { movieGenreSequelizeModel };