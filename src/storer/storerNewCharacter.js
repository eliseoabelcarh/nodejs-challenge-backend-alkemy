const { buildCharacterModel } = require("../models/characterModel");

const storerNewCharacter = (function () {
    let instance;
    function create(dao) {
      return {
        save: async (data) => {
          console.log("EN storerNewCharacter:", data);
          const newCharacter = buildCharacterModel(data)
          console.log("NEW USER essssss:", newCharacter);
          return await dao.addCharacter(newCharacter);
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
  
  module.exports = storerNewCharacter;
  