
/**
 * ------------------------------ STRAINER MOVIE GENRE ----------------------------------
 * This object knows how FIND AND STRAIN/FILTER MOVIE GENRES
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const strainerMovieGenre = (function () {
  let instance;

  function create(dao) {
    return {
      getData: async ({ visibleFields, queries }) => {
        return await dao.getMovieGenreList({ visibleFields, queries });
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

module.exports = strainerMovieGenre;
