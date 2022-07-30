const Sequelize = require("sequelize");

function characterMovieSequelizeModel(sequelize) {
  /**
   * ---------------------- CHARACTERSMOVIES SEQUELIZE MODEL --------------------------------------
   * I Define model for doing association many-to-many between movie model and character model 
   */
  const characterMovieSequelizeModel = sequelize.define("CharactersMovies", {
    characterId: { type: Sequelize.STRING, primaryKey: true },
    movieId: { type: Sequelize.STRING, primaryKey: true },
  });
  return characterMovieSequelizeModel;

}

module.exports = { characterMovieSequelizeModel };