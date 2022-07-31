const { buildCharacterModel } = require("../models/characterModel");

/**
 * ------------------------------ STORER CHARACTER ----------------------------------
 * This object knows how STORE/SAVE CHARACTERS
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const storerNewCharacter = (function () {
  let instance;
  function create(dao) {
    return {
      save: async (data) => {
        const newCharacter = buildCharacterModel(data)
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
