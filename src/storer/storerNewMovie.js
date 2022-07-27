const { buildMovieModel } = require("../models/movieModel");

const storerNewMovie = (function () {
  let instance;
  function create(dao) {
    return {
      save: async (data) => {
        console.log("EN storerNewMovie:", data);
        const newMovie = buildMovieModel(data);
        console.log("NEW Movie --rr:", newMovie);
        console.log("EN storerNewMovieDAOOO:::", dao);
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
