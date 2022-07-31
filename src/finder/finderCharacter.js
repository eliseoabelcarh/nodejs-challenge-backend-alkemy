
/**
 * ------------------------------ FINDER CHARACTER ----------------------------------
 * This object knows how find CHARACTERS, using any parameter. 
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */ 
const finderCharacter = (function () {
  let instance;
  function create(dao) {
    return {
      searchByField: async ({ field, value }) => {
        if (field === "id") {
          return await dao.getCharacterById(value);
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

module.exports = finderCharacter;
