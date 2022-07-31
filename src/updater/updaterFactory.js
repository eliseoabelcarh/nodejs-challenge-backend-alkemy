const daoFactory = require("../dao/daoFactory");
const { crearErrorEnModulo } = require("../errors/errorsHandler");
const updaterCharacter = require("./updaterCharacter");
const updaterMovie = require("./updaterMovie");
const updaterMovieGenre = require("./updaterMovieGenre");

// DEPENDENCIES for make a Dependency injection
const daoElements = daoFactory.getDao("elements");

/**
 * ---------------------------------- UPDATER FACTORY --------------------------------------------
 * This module returns an instance of UPDATER according his type
 * I used some patterns like DEPENDENCY INJECTION and FACTORY PATTERN
 *  
 */
const updaterFactory = {
  getInstance: function (type) {
    if (type === "character") {
      return updaterCharacter.getInstance(daoElements);
    }
    if (type === "movie") {
      return updaterMovie.getInstance(daoElements);
    }
    if (type === "movieGenre") {
      return updaterMovieGenre.getInstance(daoElements);
    }
    else {
      return crearErrorEnModulo("updaterFactory")
    }
  },
};

module.exports = updaterFactory;
