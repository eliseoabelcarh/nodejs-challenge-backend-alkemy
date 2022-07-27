const daoFactory = require("../dao/daoFactory");
const { crearErrorEnModulo } = require("../errors/errorsHandler");
const updaterCharacter = require("./updaterCharacter");
const updaterMovie = require("./updaterMovie");
const daoElements = daoFactory.getDao("elements");


const updaterFactory = {
  getInstance: function (type) {
    if (type === "character") {
      return updaterCharacter.getInstance(daoElements);
    }
    if (type === "movie") {
      return updaterMovie.getInstance(daoElements);
    }
    // if (type === "movieGenre") {
    //   return updaterMovieGenre.getInstance(daoElements);
    // }
    else{
      return crearErrorEnModulo("updaterFactory")
    }
  },
};

module.exports = updaterFactory;
