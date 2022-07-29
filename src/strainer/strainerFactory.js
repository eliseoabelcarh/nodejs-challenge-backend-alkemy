const daoFactory = require("../dao/daoFactory");
const { crearErrorEnModulo } = require("../errors/errorsHandler");
const strainerCharacter = require("./strainerCharacter");
const strainerMovie = require("./strainerMovie");
const strainerMovieGenre = require("./strainerMovieGenre");
const daoElements = daoFactory.getDao("elements");


const strainerFactory = {
  getInstance: function (type) {
    if (type === "character") {
      return strainerCharacter.getInstance(daoElements);
    }
    if (type === "movie") {
      return strainerMovie.getInstance(daoElements);
    }
    if (type === "movieGenre") {
      return strainerMovieGenre.getInstance(daoElements);
    }
    else{
      return crearErrorEnModulo("strainerFactory")
    }
  },
};

module.exports = strainerFactory;
