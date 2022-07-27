const daoFactory = require("../dao/daoFactory");
const storerNewUser = require("./storerNewUser");
const storerNewCharacter = require("./storerNewCharacter");
const storerNewMovie = require("./storerNewMovie");
const storerNewMovieGenre = require("./storerNewMovieGenre");

const daoUsers = daoFactory.getDao("users");

const storerFactory = {
  getInstance: function (type) {
    const daoElements = daoFactory.getDao("elements");
    if (type === "newUser") {
      return storerNewUser.getInstance(daoUsers);
    }
    if (type === "character") {
      return storerNewCharacter.getInstance(daoElements);
    }
    if (type === "movie") {
      return storerNewMovie.getInstance(daoElements);
    }
    if (type === "movieGenre") {
      return storerNewMovieGenre.getInstance(daoElements);
    }
  },
};

module.exports = storerFactory;
