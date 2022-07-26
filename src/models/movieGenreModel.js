const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

class MovieGenreModel {
  constructor({ nombre, imagen }) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.imagen = imagen;
    this.peliculas = [];
  }
  addPelicula(pelicula) {
    validatePelicula(pelicula);
    this.peliculas.push(pelicula);
  }
}
function validatePelicula(pelicula) {
  const argumentReceived = arguments[0];
  if (argumentReceived === undefined) {
    throw crearErrorArgumentosInvalidos(
      "empty movie",
      "no arguments provided"
    );
  }
  if (!pelicula) {
    throw crearErrorArgumentosInvalidos("Movie", "required field");
  }
}

function createMovieGenreModel(data) {
  if (!data) {
    throw crearErrorArgumentosInvalidos("empty data", "no arguments provided");
  }
  if (!data.nombre) {
    throw crearErrorArgumentosInvalidos("nombre", "required field");
  }
  if (!data.imagen) {
    throw crearErrorArgumentosInvalidos("imagen", "required field");
  }

  return new MovieGenreModel(data);
}

module.exports = {
  createMovieGenreModel,
};
