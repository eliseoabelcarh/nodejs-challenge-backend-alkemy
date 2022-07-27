const {characterSequelizeModel} =require("../dao/daoModels/characterSequelizeModel")
const {movieGenreSequelizeModel} = require("../dao/daoModels/movieGenreSequelizeModel")
const {movieSequelizeModel} = require("../dao/daoModels/movieSequelizeModel");
const { userSequelizeModel } = require("../dao/daoModels/userSequelizeModel");
const {DataTypes} = require("sequelize");
const { characterMovieSequelizeModel } = require("../dao/daoModels/characterMovieSequelize");

 async function getSequelizeModels(sequelize) {
    //await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const userSeqModel =  userSequelizeModel(sequelize)
    const characterSeqModel =  characterSequelizeModel(sequelize)
    const movieSeqModel =  movieSequelizeModel(sequelize)
    const movieGenreModel =  movieGenreSequelizeModel(sequelize)
    const characterMovieSeqModel =  characterMovieSequelizeModel(sequelize)
    /**
     * One-To-Many associations are connecting one source with multiple targets,
     * while all these targets are connected only with this single source.
     * As default ON DELETE to SET NULL and ON UPDATE defaults to CASCADE.
     */
    movieGenreModel.hasMany(movieSeqModel, {as:"peliculas"});
    movieSeqModel.belongsTo(movieGenreModel, {as: "genero"});

    /**
     * Many-To-Many associations connect one source with multiple targets, while
     * all these targets can in turn be connected to other sources beyond the first.
     * the defaults for both ON UPDATE and ON DELETE are CASCADE
     */
    //Define model
  
    
     characterSeqModel.belongsToMany(movieSeqModel, {as: 'peliculas', through: characterMovieSeqModel });
     movieSeqModel.belongsToMany(characterSeqModel, {as: 'personajes', through: characterMovieSeqModel });
     // in case throws errors: ----no existe la relación «movieGenres»
     //ORDER MATTERS // WARNING!!
     await userSeqModel.sync()
     await movieGenreModel.sync()
     await characterSeqModel.sync();
     await movieSeqModel.sync();
     await characterMovieSeqModel.sync();
     
     return {characterSeqModel,movieSeqModel,movieGenreModel,characterMovieSeqModel , userSeqModel}
}

module.exports = { getSequelizeModels };