const { buildCharacterModel } = require("../models/characterModel");

const storerNewCharacter = (function () {
    let instance;
    function create(dao) {
      return {
        save: async (data) => {
          console.log("EN storerNewCharacter:", data);
          const newCharacter = buildCharacterModel(data)
          console.log("NEW Characterrr:", newCharacter);
          console.log("EN storerNewCharacterDAOOO:::",dao)
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
  