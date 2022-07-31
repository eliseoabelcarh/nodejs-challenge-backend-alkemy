const { buildMovieGenreModel } = require("../models/movieGenreModel");

/**
 * ------------------------------ STORER MOVIE GENRE ----------------------------------
 * This object knows how STORE/SAVE MOVIE GENRES
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const storerNewMovieGenre = (function () {
  let instance;
  function create(dao) {
    return {
      save: async (data) => {
        const newMovieGenre = buildMovieGenreModel(data);
        return await dao.addMovieGenre(newMovieGenre);
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

module.exports = storerNewMovieGenre;