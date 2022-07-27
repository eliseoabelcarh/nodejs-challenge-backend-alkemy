const { crearErrorEnModulo } = require("../errors/errorsHandler");
const { buildMovieModel } = require("../models/movieModel");

const updaterCharacter = (function () {
    let instance;
  
    function create(dao) {
      return {
        updateElement: async ({id, action, field, value}) => {
          if (action === "add" && field === "movie") {
            const movieModel = buildMovieModel(value)
            return await dao.addMovieToCharacter({id,value:movieModel});
          }
          else{
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