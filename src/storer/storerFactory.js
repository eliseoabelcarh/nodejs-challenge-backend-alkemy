
const storerNewUser = require("./storerNewUser");
const storerNewCharacter = require("./storerNewCharacter");
const storerNewMovie = require("./storerNewMovie");
const storerNewMovieGenre = require("./storerNewMovieGenre");

// DEPENDENCIES for make a Dependency injection
const daoFactory = require("../dao/daoFactory");
const daoUsers = daoFactory.getDao("users");
const daoElements = daoFactory.getDao("elements");

/**
 * ---------------------------------- STORER FACTORY --------------------------------------------
 * This module returns an instance of STORER according his type
 * I used some patterns like DEPENDENCY INJECTION and FACTORY PATTERN
 *  
 */
const storerFactory = {
  getInstance: function (type) {
    
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
