/**
 * ------------------------------ REMOVER CHARACTER ----------------------------------
 * This object knows how REMOVE CHARACTERS
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const removerCharacter = (function () {
    let instance;
    function create(dao) {
      return {
        remove: async (data) => {
          return await dao.removeCharacter(data);
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
  
  module.exports = removerCharacter;
  