const { buildMovieModel } = require("../models/movieModel");

/**
 * ------------------------------ STORER MOVIE ----------------------------------
 * This object knows how STORE/SAVE MOVIES
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const storerNewMovie = (function () {
  let instance;
  function create(dao) {
    return {
      save: async (data) => {
        const newMovie = buildMovieModel(data);
        return await dao.addMovie(newMovie);
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

module.exports = storerNewMovie;
