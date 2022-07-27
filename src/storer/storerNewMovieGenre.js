const { buildMovieGenreModel } = require("../models/movieGenreModel");


const storerNewMovieGenre = (function () {
  let instance;
  function create(dao) {
    return {
      save: async (data) => {
        console.log("EN storerNewMovieGenre:", data);
        const newMovieGenre = buildMovieGenreModel(data);
        console.log("NEW Movie --rr:", newMovieGenre);
        console.log("EN storerNewMovieGenreGenreDAOOO:::", dao);
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