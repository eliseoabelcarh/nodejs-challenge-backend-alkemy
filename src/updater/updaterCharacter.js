const { crearErrorEnModulo } = require("../errors/errorsHandler");
const { prepareFieldsToModifyInCharacterModel } = require("../models/characterModel");
const { buildMovieModel } = require("../models/movieModel");

/**
 * ------------------------------ UPDATER CHARACTER ----------------------------------
 * This object knows how UPDATE CHARACTERS and his elements
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const updaterCharacter = (function () {
  let instance;

  function create(dao) {
    return {
      updateElement: async ({ id, action, field, value }) => {
        if (action === "add" && field === "movie") {
          if (value.hasOwnProperty('movieId')) {
            return await dao.addMovieToCharacterWithIds({ id, value: value.movieId });
          } else {
            const movieModel = buildMovieModel(value)
            return await dao.addMovieToCharacter({ id, value: movieModel });
          }
        }
        if (action === "remove" && field === "movie") {
          //id = characterID -- value = movieID
          return await dao.removeMovieFromCharacter({ id, value });
        }
        if (action === "modify" && field === "element") {
          const prepared = prepareFieldsToModifyInCharacterModel(value)
          return await dao.updateCharacter({ id, value: prepared });
        }
        else {
          throw crearErrorEnModulo("updater: action or field invalid")
        }

      },
    };
  }

  return {
    getInstance: function (dao) {
      if (!instance) {
        instance = create(dao);
      }
      return instance;
    },
  };
})();

module.exports = updaterCharacter;