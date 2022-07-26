const Sequelize = require("sequelize");

async function characterMovieSequelizeModel(sequelize) {

  //Define model
  const characterMovieSequelizeModel = sequelize.define("CharactersMovies", {
    characterId: { type: Sequelize.STRING, primaryKey: true },
    movieId: { type: Sequelize.STRING, primaryKey: true },
  });
  //The call to characterMovieSequelizeModel.sync() above will cause Sequelize to synchronize the model with the database.
  await characterMovieSequelizeModel.sync();
  return characterMovieSequelizeModel;

}

module.exports = { characterMovieSequelizeModel };