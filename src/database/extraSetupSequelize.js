const {characterSequelizeModel} =require("../dao/daoModels/characterSequelizeModel")
const {movieGenreSequelizeModel} = require("../dao/daoModels/movieGenreSequelizeModel")
const {movieSequelizeModel} = require("../dao/daoModels/movieSequelizeModel");
const { userSequelizeModel } = require("../dao/daoModels/userSequelizeModel");
async function applyExtraSetup(sequelize) {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const userSeq = await userSequelizeModel(sequelize)
    const characterSeqModel = await characterSequelizeModel(sequelize)
    const movieSeqModel = await movieSequelizeModel(sequelize)
    const movieGenreModel = await movieGenreSequelizeModel(sequelize)
    /**
     * One-To-Many associations are connecting one source with multiple targets,
     * while all these targets are connected only with this single source.
     * As default ON DELETE to SET NULL and ON UPDATE defaults to CASCADE.
     */
    movieGenreModel.hasMany(movieSeqModel, {
        foreignKey: 'genreId'
    });
    movieSeqModel.belongsTo(movieGenreModel);

    /**
     * Many-To-Many associations connect one source with multiple targets, while
     * all these targets can in turn be connected to other sources beyond the first.
     * the defaults for both ON UPDATE and ON DELETE are CASCADE
     */
     characterSeqModel.belongsToMany(movieSeqModel, { through: 'CharactersMovies' });
     movieSeqModel.belongsToMany(characterSeqModel, { through: 'CharactersMovies' });
}

module.exports = { applyExtraSetup };