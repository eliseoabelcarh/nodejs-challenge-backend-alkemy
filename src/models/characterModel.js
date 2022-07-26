const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

class CharacterModel {
  constructor({ id, imagen, nombre, edad, peso, historia, peliculas }) {
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.edad = edad;
    this.peso = peso;
    this.historia = historia;
    this.peliculas = peliculas;
  }
  addMovie(pelicula) {
    validateMovie(pelicula);
    this.peliculas.push(pelicula);
  }
}
function validateMovie(pelicula) {
  const argumentReceived = arguments[0];
  if (argumentReceived === undefined) {
    throw crearErrorArgumentosInvalidos(
      "empty movie or serie",
      "no arguments provided"
    );
  }
  if (!pelicula) {
    throw crearErrorArgumentosInvalidos("Movie", "required field");
  }
}

function buildCharacterModel(data) {
  validRequiredFields(data);
  data.id = uuidv4();
  // if (!data.id) {
  //   data.id = uuidv4();
  // } 
  // else {
  //   throw crearErrorArgumentosInvalidos("id", "you cant provide id");
  // }
  if (!data.peliculas || Object.keys(data.peliculas).length === 0) {
    data.peliculas = [];
    return new CharacterModel(data);
  } else {
    return new CharacterModel(data);
  }
}
function recoverCharacterModel(data) {
  validRequiredFields(data);
  if (!data.id) {
    throw crearErrorArgumentosInvalidos("id", "required field");
  }
  if (!data.peliculas) {
    data.peliculas = []
  }
  return new CharacterModel(data);
}
function validRequiredFields(data) {
  if (!data || Object.keys(data).length === 0) {
    throw crearErrorArgumentosInvalidos("empty data", "no arguments provided");
  }
  if (!data.imagen) {
    throw crearErrorArgumentosInvalidos("imagen", "required field");
  }
  if (!data.nombre) {
    throw crearErrorArgumentosInvalidos("nombre", "required field");
  }
  if (!data.edad) {
    throw crearErrorArgumentosInvalidos("edad", "required field");
  }
  if (!data.peso) {
    throw crearErrorArgumentosInvalidos("peso", "required field");
  }
  if (!data.historia) {
    throw crearErrorArgumentosInvalidos("historia", "required field");
  }
}
module.exports = {
  buildCharacterModel,
  recoverCharacterModel,
};
