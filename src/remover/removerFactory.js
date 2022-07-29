const daoFactory = require("../dao/daoFactory");
const removerCharacter = require("./removerCharacter");
const removerMovie = require("./removerMovie");
const removerMovieGenre = require("./removerMovieGenre");
const daoElements = daoFactory.getDao("elements");

const removerFactory = {
  getInstance: function (type) {
    if (type === "character") {
      return removerCharacter.getInstance(daoElements);
    }
    if (type === "movie") {
        removerMovie
      return removerMovie.getInstance(daoElements);
    }
    if (type === "movieGenre") {
        removerMovieGenre
      return removerMovieGenre.getInstance(daoElements);
    }
  },
};

module.exports = removerFactory;