const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");

class CharacterModel {
  constructor({ imagen, nombre, edad, peso, historia }) {
    this.imagen = imagen;
    this.nombre = nombre;
    this.edad = edad;
    this.peso = peso;
    this.historia = historia;
    this.peliculasOSeriesIds = [];
  }
  addMovieOrSerieId(id) {
    validateMovieOrSerieId(id);
   
  }
}
function validateMovieOrSerieId(id) {
  const argumentReceived = arguments[0];
  if (!argumentReceived) {
    throw crearErrorArgumentosInvalidos(
      "empty movie or serie id","no arguments provided"
    );
  }
   //TODO import DAO to check if exists ID
}

function createCharacterModel(data) {
  if (!data) {
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
  return new CharacterModel(data);
}

module.exports = {
  createCharacterModel,
};
