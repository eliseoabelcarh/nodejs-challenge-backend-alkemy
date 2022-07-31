
/**
 * ------------------------------ STRAINER CHARACTER ----------------------------------
 * This object knows how FIND AND STRAIN/FILTER CHARACTERS
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const strainerCharacter = (function () {
  let instance;

  function create(dao) {
    return {
      getData: async ({ visibleFields, queries }) => {
        return await dao.getCharacterList({ visibleFields, queries });
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

module.exports = strainerCharacter;
