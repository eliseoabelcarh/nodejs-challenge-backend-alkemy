const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

class CharacterModel {
  constructor({ imagen, nombre, edad, peso, historia, peliculasIds }) {
    this.id = uuidv4();
    this.imagen = imagen;
    this.nombre = nombre;
    this.edad = edad;
    this.peso = peso;
    this.historia = historia;
    this.peliculasIds = peliculasIds;
  }
  addMovieId(id) {
    validateMovieId(id);
    this.peliculasIds.push(id);
  }
}
function validateMovieId(id) {
  const argumentReceived = arguments[0];
  if (argumentReceived === undefined) {
    throw crearErrorArgumentosInvalidos(
      "empty movie or serie id",
      "no arguments provided"
    );
  }
  if (!id) {
    throw crearErrorArgumentosInvalidos("Movie Id", "required field");
  }
}

function buildCharacterModel(data) {
  validFields(data);
  if (!data.peliculasIds || Object.keys(data.peliculasIds).length === 0) {
    console.log("NO HAY PELICULASID --------- DSFFFDFDFDFDFDFDFDFDFDFDFDFDFD----------------------------")
    const {id,imagen,nombre,edad,peso,historia} = data
    return new CharacterModel({id,imagen,nombre,edad,peso,historia,peliculasIds:[]});
  }else{
    return new CharacterModel(data);
  }
}

function validFields(data) {
  if (!data || Object.keys(data).length === 0) {
    throw crearErrorArgumentosInvalidos("empty data", "no arguments provided");
  }
  if (!data.id) {
    throw crearErrorArgumentosInvalidos("id", "required field");
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
  buildCharacterModel
};
