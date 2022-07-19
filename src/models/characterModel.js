const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require('uuid');
  // How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 
 

class CharacterModel {
  constructor({ imagen, nombre, edad, peso, historia }) {
    this.id = uuidv4();
    this.imagen = imagen;
    this.nombre = nombre;
    this.edad = edad;
    this.peso = peso;
    this.historia = historia;
    this.peliculasOSeriesIds = [];
  }
  addMovieOrSerieId(id) {
    validateMovieOrSerieId(id);
   // this.peliculasOSeriesIds.push(id)
  }
}
function validateMovieOrSerieId(id) {
  const argumentReceived = arguments[0];
  if (argumentReceived === undefined) {
    throw crearErrorArgumentosInvalidos(
      "empty movie or serie id","no arguments provided"
    );
  }
  if(!id){
    throw crearErrorArgumentosInvalidos("Movie/Serie Id", "required field")
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
