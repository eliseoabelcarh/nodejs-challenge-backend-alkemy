const daoFactory = require("../dao/daoFactory");
const { crearErrorEnModulo } = require("../errors/errorsHandler");
const finderCharacter = require("./finderCharacter");
const finderMovie = require("./finderMovie");
const finderMovieGenre = require("./finderMovieGenre");
const finderUser = require("./finderUser");

// DEPENDENCIES for make a Dependency injection
const daoUsers = daoFactory.getDao("users");
const daoElements = daoFactory.getDao("elements");

/**
 * ---------------------------------- FINDER FACTORY --------------------------------------------
 * This module returns an instance of FINDER according his type
 * I used some patterns like DEPENDENCY INJECTION and FACTORY PATTERN
 *  
 */
const finderFactory = {
  getInstance: function (type) {
    if (type === "user") {
      return finderUser.getInstance(daoUsers);
    }
    if (type === "character") {
      return finderCharacter.getInstance(daoElements);
    }
    if (type === "movie") {
      return finderMovie.getInstance(daoElements);
    }
    if (type === "movieGenre") {
      return finderMovieGenre.getInstance(daoElements);
    }
    else{
      return crearErrorEnModulo("finderFactory")
    }
  },
};

module.exports = finderFactory;
