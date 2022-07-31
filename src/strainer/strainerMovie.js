
/**
 * ------------------------------ STRAINER MOVIE ----------------------------------
 * This object knows how FIND AND STRAIN/FILTER MOVIES
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const strainerMovie = (function () {
  let instance;

  function create(dao) {
    return {
      getData: async ({ visibleFields, queries }) => {
        return await dao.getMovieList({ visibleFields, queries });
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

module.exports = strainerMovie;
