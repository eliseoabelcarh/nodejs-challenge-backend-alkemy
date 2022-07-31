const daoFactory = require("../dao/daoFactory");
const removerCharacter = require("./removerCharacter");
const removerMovie = require("./removerMovie");
const removerMovieGenre = require("./removerMovieGenre");

// DEPENDENCIES for make a Dependency injection
const daoElements = daoFactory.getDao("elements");

/**
 * ---------------------------------- REMOVER FACTORY --------------------------------------------
 * This module returns an instance of REMOVER according his type
 * I used some patterns like DEPENDENCY INJECTION and FACTORY PATTERN
 *  
 */
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