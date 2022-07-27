const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

class MovieGenreModel {
  constructor({ id, nombre, imagen, peliculas }) {
    this.id = id,
    this.nombre = nombre;
    this.imagen = imagen;
    this.peliculas = peliculas;
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

function buildMovieGenreModel(data) {
  validRequiredFields(data)
  data.id = uuidv4()
  if (!data.peliculas || Object.keys(data.peliculas).length === 0) {
    data.peliculas = [];
    return new MovieGenreModel(data);
  } else {
    return new MovieGenreModel(data);
  }
}
function recoverMovieGenreModel(data) {
  validRequiredFields(data);
  if (!data.id) {
    throw crearErrorArgumentosInvalidos("id", "required field");
  }
  if (!data.peliculas) {
    data.peliculas = []
  }
  return new MovieGenreModel(data);
}

function validRequiredFields(data) {
  if (!data) {
    throw crearErrorArgumentosInvalidos("empty data", "no arguments provided");
  }
  if (!data.nombre) {
    throw crearErrorArgumentosInvalidos("nombre", "required field");
  }
  if (!data.imagen) {
    throw crearErrorArgumentosInvalidos("imagen", "required field");
  }
}

module.exports = {
  buildMovieGenreModel,recoverMovieGenreModel
};
