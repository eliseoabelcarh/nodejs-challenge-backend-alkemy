const { crearErrorEnModulo } = require("../errors/errorsHandler");
const { buildCharacterModel } = require("../models/characterModel");


const updaterMovie = (function () {
    let instance;
  
    function create(dao) {
      return {
        updateElement: async ({id, action, field, value}) => {
          if (action === "add" && field === "character") {
            const characterModel = buildCharacterModel(value)
            return await dao.addCharacterToMovie({id,value:characterModel});
          }
          if (action === "remove" && field === "character") {
            //id = MovieID -- value = characterID
            return await dao.removeCharacterFromMovie({id,value});
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
  
  module.exports = updaterMovie;