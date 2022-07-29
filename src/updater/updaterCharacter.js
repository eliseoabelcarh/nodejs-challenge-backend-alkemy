const { crearErrorEnModulo } = require("../errors/errorsHandler");
const { prepareFieldsToModifyInCharacterModel } = require("../models/characterModel");
const { buildMovieModel } = require("../models/movieModel");

const updaterCharacter = (function () {
  let instance;

  function create(dao) {
    return {
      updateElement: async ({ id, action, field, value }) => {
        if (action === "add" && field === "movie") {
          const movieModel = buildMovieModel(value)
          return await dao.addMovieToCharacter({ id, value: movieModel });
        }
        if (action === "remove" && field === "movie") {
          //id = characterID -- value = movieID
          return await dao.removeMovieFromCharacter({ id, value });
        } 
        if (action === "modify" && field === "element") {
          const prepared = prepareFieldsToModifyInCharacterModel(value)
          return await dao.updateCharacter({ id, value:prepared });
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