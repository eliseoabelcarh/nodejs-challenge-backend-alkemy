const daoFactory = require("../dao/daoFactory");
const { crearErrorEnModulo } = require("../errors/errorsHandler");
const strainerCharacter = require("./strainerCharacter");
const daoElements = daoFactory.getDao("elements");


const strainerFactory = {
  getInstance: function (type) {
    if (type === "character") {
      return strainerCharacter.getInstance(daoElements);
    }
    // if (type === "movie") {
    //   return updaterMovie.getInstance(daoElements);
    // }
    // if (type === "movieGenre") {
    //   return updaterMovieGenre.getInstance(daoElements);
    // }
    else{
      return crearErrorEnModulo("strainerFactory")
    }
  },
};

module.exports = strainerFactory;
