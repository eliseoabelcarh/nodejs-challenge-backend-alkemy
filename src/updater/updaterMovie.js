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