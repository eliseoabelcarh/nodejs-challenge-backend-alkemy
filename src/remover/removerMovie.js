/**
 * ------------------------------ REMOVER MOVIE ----------------------------------
 * This object knows how REMOVE MOVIES
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const removerMovie = (function () {
    let instance;
    function create(dao) {
      return {
        remove: async (data) => {
          return await dao.removeMovie(data);
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
  
  module.exports = removerMovie;
  