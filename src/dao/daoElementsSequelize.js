const { crearErrorRecursoNoEncontrado } = require("../../src/errors/errorsHandler");
const { getSequelizeModels } = require("../database/sequelizeModels");
const { recoverCharacterModel, recoverCharactersList } = require("../models/characterModel");
const { recoverMovieGenreModel, recoverMovieGenreList } = require("../models/movieGenreModel");
const { recoverMovieModel, recoverMoviesList } = require("../models/movieModel");
const {
  modelWhereCharacterModel,
  modelWhereAssociatedCharacterModel,
  getModelOrderQuery,
  modelWhereMovieModel,
  modelWhereAssociatedMovieModel,
} = require("./daoModels/queriesSequelizeModel");

/**
 * ------------------------------ DAO ELEMENTS: DATA ACCESS OBJECT PATTERN-------------------------------
 * This pattern will provide an abstract interface for persistence mechanism
 * I use SINGLETON PATTERN too: is a software design pattern that restricts
 * the instantiation of a class to one "single" instance 
 * THIS DAO handle Characters, Movies and movieGenre operations
 */
let daoElementsSequelize = (function () {

  let instance;

  function create() {
    return {
      getCharacterList: async ({ visibleFields, queries }) => {
        const associationModelVisibleFields = ["id", "imagen", "titulo"];
        const whereCharacterModel = modelWhereCharacterModel(queries);
        const whereAssociatedCharacterModel = modelWhereAssociatedCharacterModel(queries);
        const orderArrayQueries = getModelOrderQuery(queries);
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const elements = await characterSeqModel.findAll({
          where: whereCharacterModel,
          include: [
            {
              required:
                Object.keys(whereAssociatedCharacterModel).length > 0
                  ? true
                  : false, //important!!! for inner join
              model: movieSeqModel,
              as: "peliculas",// this is because you are using alias in model
              attributes: associationModelVisibleFields, //example:["id", "imagen"]
              through: {
                //This object refers to table MovieCharacters
                where: whereAssociatedCharacterModel, //example: {movieId: "45XFD"}
              },
            },
          ],
          order: [
            orderArrayQueries, // example:['id', 'ASC']
          ],
        });
        const result = recoverCharactersList(elements);
        return result;
      },
      getMovieList: async ({ visibleFields, queries }) => {
        const associationModelVisibleFields = ["id", "imagen", "nombre"];
        const whereMovieModel = modelWhereMovieModel(queries);
        const whereAssociatedMovieModel =
          modelWhereAssociatedMovieModel(queries);
        const orderArrayQueries = getModelOrderQuery(queries);
        const { characterSeqModel, movieSeqModel, movieGenreSeqModel } =
          await getSequelizeModels();
        const elements = await movieSeqModel.findAll({
          where: whereMovieModel,
          include: [
            {
              required:
                Object.keys(whereAssociatedMovieModel).length > 0
                  ? true
                  : false, //important!!! for inner join
              model: characterSeqModel,
              as: "personajes",// this is because you are using alias in model
              attributes: associationModelVisibleFields, //example:["id", "imagen"]
              through: {
                //referes to table MovieCharacters
                where: whereAssociatedMovieModel, //example: {movieId: "45XFD"}
              },
            },
          ],
          order: [
            orderArrayQueries, // example:['id', 'ASC']
          ],
        });
        const result = recoverMoviesList(elements);
        return result;
      },
      getMovieGenreList: async ({ visibleFields, queries }) => {
        const { movieGenreSeqModel } = await getSequelizeModels();
        const { movieSeqModel } = await getSequelizeModels();
        const elements = await movieGenreSeqModel.findAll({
          include: [
            {
              model: movieSeqModel,
              as: "peliculas",// this is because you are using alias in model
              attributes: ["id", "imagen", "titulo", "fechaCreacion"],
            },
          ],
        });
        const result = recoverMovieGenreList(elements);
        return result;
      },
      updateMovieGenre: async ({ id, value }) => {
        const { movieGenreSeqModel } = await getSequelizeModels();
        const movieGenreInDB = await movieGenreSeqModel.findOne({
          where: { id },
        });
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        await movieGenreInDB.update(value); //returns object without movieGenres
        const movieGenreUpdated = await movieGenreSeqModel.findOne({
          where: { id: movieGenreInDB.id },
          include: ["peliculas"],// this is because you are using alias in model
        });
        const result = recoverMovieGenreModel(movieGenreUpdated);
        return result;
      },
      updateMovie: async ({ id, value }) => {
        const { movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        await movieInDB.update(value); //returns object without movies
        const movieUpdated = await movieSeqModel.findOne({
          where: { id: movieInDB.id },
          include: ["personajes"],
        });
        const result = recoverMovieModel(movieUpdated);
        return result;
      },
      updateCharacter: async ({ id, value }) => {
        const { characterSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({
          where: { id },
        });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        await characterInDB.update(value); //returns object without movies
        const characterUpdated = await characterSeqModel.findOne({
          where: { id: characterInDB.id },
          include: ["peliculas"],
        });
        const result = recoverCharacterModel(characterUpdated);
        return result;
      },
      removeCharacter: async (id) => {
        const { characterSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({
          where: { id },
        });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const result = await characterInDB.destroy();
        return result;
      },
      removeMovie: async (id) => {
        const { movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        const result = await movieInDB.destroy(); //returns empty array
        return result;
      },
      removeMovieGenre: async (id) => {
        const { movieGenreSeqModel } = await getSequelizeModels();
        const movieGenreInDB = await movieGenreSeqModel.findOne({
          where: { id },
        });
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        const result = await movieGenreInDB.destroy(); //returns empty array
        return result;
      },
      addMovie: async (movie) => {
        const { movieSeqModel } = await getSequelizeModels();
        const dbMovie = await movieSeqModel.create(movie);
        const result = recoverMovieModel(dbMovie);
        return result;
      },
      addMovieToMovieGenre: async ({ id, value }) => {
        const { movieSeqModel, movieGenreSeqModel } =
          await getSequelizeModels();
        const movieGenreInDB = await movieGenreSeqModel.findOne({
          where: { id },
        });
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        const movieInDB = await movieSeqModel.create(value);
        await movieGenreInDB.addPeliculas(movieInDB); //returns movieGenresMovies Element
        const movieUpdated = await movieSeqModel.findOne({
          where: { id: movieInDB.id },
          include: ["personajes"],
        });
        const result = recoverMovieModel(movieUpdated);
        return result;
      },

      addMovieToCharacter: async ({ id, value }) => {
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({
          where: { id },
        });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const movieInDB = await movieSeqModel.create(value);
        await characterInDB.addPeliculas(movieInDB); //returns CharactersMovies Element
        const movieUpdated = await movieSeqModel.findOne({
          where: { id: movieInDB.id },
          include: ["personajes"],
        });
        const result = recoverMovieModel(movieUpdated);
        return result;
      },
      addMovieToCharacterWithIds: async ({ id, value }) => {
        //id is character id
        //value is a string with movie Id
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({
          where: { id },
        });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const movieInDB = await movieSeqModel.findOne({ where: { id: value } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        await characterInDB.addPeliculas(movieInDB); //returns CharactersMovies Element
        const movieUpdated = await movieSeqModel.findOne({
          where: { id: movieInDB.id },
          include: ["personajes"],
        });
        const result = recoverMovieModel(movieUpdated);
        return result;
      },
      addCharacterToMovieWithIds: async ({ id, value }) => {
        //id is movie id
        //value is a string with character Id
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({
          where: { id: value },
        });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        await movieInDB.addPersonajes(characterInDB); //returns CharactersMovies Element

        const characterUpdated = await characterSeqModel.findOne({
          where: { id: characterInDB.id },
          include: ["peliculas"],
        });
        const result = recoverCharacterModel(characterUpdated);
        return result;
      },
      addMovieToMovieGenreWithIds: async ({ id, value }) => {
        //id is movieGenre id
        //value is a string with movie Id
        const { movieSeqModel, movieGenreSeqModel } =
          await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id: value } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        const movieGenreInDB = await movieGenreSeqModel.findOne({
          where: { id },
        });
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        await movieGenreInDB.addPeliculas(movieInDB); //returns moviesMovieGenres Element
        const movieUpdated = await movieSeqModel.findOne({
          where: { id: movieInDB.id },
          include: ["personajes"],
        });
        const result = recoverMovieModel(movieUpdated);
        return result;
      },
      addCharacterToMovie: async ({ id, value }) => {
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        const characterInDB = await characterSeqModel.create(value);
        await movieInDB.addPersonajes(characterInDB); //returns CharactersMovies Element
        const characterUpdated = await characterSeqModel.findOne({
          where: { id: characterInDB.id },
          include: ["peliculas"],// this is because you are using alias in model
        });
        const result = recoverCharacterModel(characterUpdated);
        return result;
      },
      removeCharacterFromMovie: async ({ id, value }) => {
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        const characterInDB = await characterSeqModel.findOne({
          where: { id: value },
        });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
       await movieInDB.removePersonajes(characterInDB);
        const movieUpdated = await movieSeqModel.findOne({
          where: { id: movieInDB.id },
          include: ["personajes"],
        });
        const result = recoverMovieModel(movieUpdated);
        return result;
      },
      removeMovieFromMovieGenre: async ({ id, value }) => {
        const { movieSeqModel, movieGenreSeqModel } = await getSequelizeModels();
        const movieGenreInDB = await movieGenreSeqModel.findOne({
          where: { id },
        });
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        const movieInDB = await movieSeqModel.findOne({ where: { id: value } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        await movieGenreInDB.removePeliculas(movieInDB); //returns 1 if success
        const movieGenreUpdated = await movieGenreSeqModel.findOne({
          where: { id: movieGenreInDB.id },
          include: ["peliculas"],
        });
        const result = recoverMovieGenreModel(movieGenreUpdated);
        return result;
      },

      removeMovieFromCharacter: async ({ id, value }) => {
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({
          where: { id },
        });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const movieInDB = await movieSeqModel.findOne({ where: { id: value } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        await characterInDB.removePeliculas(movieInDB); //return 1 if success
        const characterUpdated = await characterSeqModel.findOne({
          where: { id: characterInDB.id },
          include: ["peliculas"],
        });
        const result = recoverCharacterModel(characterUpdated);
        return result;
      },

      addMovieGenre: async (movieGenre) => {
        const { movieGenreSeqModel } = await getSequelizeModels();
        const dbMovieGenre = await movieGenreSeqModel.create(movieGenre);
        const result = recoverMovieGenreModel(dbMovieGenre);
        return result;
      },

      addCharacter: async (character) => {
        const { characterSeqModel } = await getSequelizeModels();
        const dbCharacter = await characterSeqModel.create(character);
        const result = recoverCharacterModel(dbCharacter);
        return result;
      },
      getCharacterById: async (id) => {
        const { characterSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({
          where: { id },
          include: ["peliculas"],
        });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const result = recoverCharacterModel(characterInDB);
        return result;
      },
      getMovieById: async (id) => {
        const { movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({
          where: { id },
          include: ["personajes"],
        });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        const result = recoverMovieModel(movieInDB);
        return result;
      },
      getMovieGenreById: async (id) => {
        const { movieGenreSeqModel } = await getSequelizeModels();
        const movieGenreInDB = await movieGenreSeqModel.findOne({
          where: { id },
          include: ["peliculas"],
        });
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        const result = recoverMovieGenreModel(movieGenreInDB);
        return result;
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = create();
      }
      return instance;
    },
  };
})();

module.exports = daoElementsSequelize;
