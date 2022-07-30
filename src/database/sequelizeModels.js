const { characterSequelizeModel } = require("../dao/daoModels/characterSequelizeModel")
const { movieGenreSequelizeModel } = require("../dao/daoModels/movieGenreSequelizeModel")
const { movieSequelizeModel } = require("../dao/daoModels/movieSequelizeModel");
const { userSequelizeModel } = require("../dao/daoModels/userSequelizeModel");
const { characterMovieSequelizeModel } = require("../dao/daoModels/characterMovieSequelize");
const connectSequelize = require("./connectionSequelize");

/**
 * -----------------------------------  SEQUELIZE MODELS --------------------------------------------
 */
async function getSequelizeModels() {
  const sequelize = await (await connectSequelize).getInstance()
  // Check if connections is established, also you can use: await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  // I get sequelize models for doing associations (relationships between tables in database)
  const userSeqModel = userSequelizeModel(sequelize)
  const characterSeqModel = characterSequelizeModel(sequelize)
  const movieSeqModel = movieSequelizeModel(sequelize)
  const movieGenreSeqModel = movieGenreSequelizeModel(sequelize)
  const characterMovieSeqModel = characterMovieSequelizeModel(sequelize)
  /**
   * One-To-Many associations are connecting one source with multiple targets,
   * while all these targets are connected only with this single source.
   * As default ON DELETE to SET NULL and ON UPDATE defaults to CASCADE.
   */
  // ill use an alias for making easy to use functions like "addPeliculas"
  movieGenreSeqModel.hasMany(movieSeqModel, { as: "peliculas" });
  movieSeqModel.belongsTo(movieGenreSeqModel);

  /**
   * Many-To-Many associations connect one source with multiple targets, while
   * all these targets can in turn be connected to other sources beyond the first.
   * the defaults for both ON UPDATE and ON DELETE are CASCADE
   */
  //Defining associations
  // ill use an alias for making easy to use functions like "addPeliculas"
  // characterMovieSeqModel will works as a conjunction table
  characterSeqModel.belongsToMany(movieSeqModel, { as: 'peliculas', through: characterMovieSeqModel });
  movieSeqModel.belongsToMany(characterSeqModel, { as: 'personajes', through: characterMovieSeqModel });
  // In case something throws errors, for example:
  // ----no existe la relación «movieGenres»
  //ORDER MATTERS // WARNING!!
  await userSeqModel.sync()
  await movieGenreSeqModel.sync()
  await characterSeqModel.sync();
  await movieSeqModel.sync();
  await characterMovieSeqModel.sync();

  return { characterSeqModel, movieSeqModel, movieGenreSeqModel, characterMovieSeqModel, userSeqModel }
}

module.exports = { getSequelizeModels };