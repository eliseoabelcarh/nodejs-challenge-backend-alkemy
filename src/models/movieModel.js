const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
const CALIFICACION_MINIMA = 1
const CALIFICACION_MAXIMA = 5
class MovieModel {
  constructor({ imagen, titulo, fechaCreacion, calificacion }) {
    this.id = uuidv4();
    this.imagen = imagen;
    this.titulo = titulo;
    this.fechaCreacion = fechaCreacion;
    this.calificacion = calificacion;
    this.personajesIds = [];
  }
  addPersonajeId(id) {
    validatePersonajeId(id);
    this.personajesIds.push(id);
  }
}
function validatePersonajeId(id) {
  const argumentReceived = arguments[0];
  if (argumentReceived === undefined) {
    throw crearErrorArgumentosInvalidos(
      "empty personaje id",
      "no arguments provided"
    );
  }
  if (!id) {
    throw crearErrorArgumentosInvalidos("Personaje Id", "required field");
  }
}

function createMovieModel(data) {
  if (!data) {
    throw crearErrorArgumentosInvalidos("empty data", "no arguments provided");
  }
  if (!data.imagen) {
    throw crearErrorArgumentosInvalidos("imagen", "required field");
  }
  if (!data.titulo) {
    throw crearErrorArgumentosInvalidos("titulo", "required field");
  }
  if (!data.fechaCreacion) {
    throw crearErrorArgumentosInvalidos("fechaCreacion", "required field");
  }
  if (!data.calificacion) {
    throw crearErrorArgumentosInvalidos("calificacion", "required field");
  }
  if (isNaN(data.calificacion) ) {
    throw crearErrorArgumentosInvalidos("calificacion", "is not a number");
  }
  if (data.calificacion > CALIFICACION_MAXIMA || data.calificacion < CALIFICACION_MINIMA) {
    throw crearErrorArgumentosInvalidos("calificacion", "wrong valuee");
  }
  if (!data.personajesIds) {
    throw crearErrorArgumentosInvalidos("personajesIds", "required field");
  }

  return new MovieModel(data);
}

module.exports = {
  createMovieModel,
};
