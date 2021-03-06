const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

/**
 * ------------------------------------ CHARACTER MODEL ----------------------------------
 * This could be define as an JS Object to be consistent with all my developing work until now,
 * but I decide to make it with JS Classes just for change a little. The architecture and performance is
 * not affected, and if you change to another type of object, you can do it, and the only file
 * affected it was here.  
 */
class CharacterModel {
  constructor({ id, imagen, nombre, edad, peso, historia, peliculas }) {
    //This field ID is used for maintain full control about ids,REGARDLESS of the database we use
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
  hasMovie(movieId) {
    let i = 0
    let founded = null
    while (i < this.peliculas.length && !founded) {
      if (this.peliculas[i].id === movieId) {
        founded = this.peliculas[i]
      }
      i++
    }
    return founded
  }
}
/**
 * ------------------------- RECOVER FUNCTION -------------------------------------
 * This function is used to validate data, clean and recover fields when we get it from
 * any database. Especially if database add extra fields when save it in tables for SQL databases
 * or in objects for example in noSql databases cases for example. Some extra fields are:
 * createdAt, _id, uuid, etc
 */
 function recoverCharacterModel(data) {
  validRequiredFields(data);
  if (!data.id) {
    throw crearErrorArgumentosInvalidos("id", "required field");
  }
  if (!data.peliculas) {
    data.peliculas = [];
  }
  else {
    const newArray = data.peliculas.map((movieDB) =>
      getMyMoviesPretty(movieDB)
    );
    data.peliculas = newArray;
  }
  return new CharacterModel(data);
}

function isAValidCharacterField(field) {
  const atributtes = ["id", "imagen", "nombre", "edad", "peso", "historia", "peliculas", "name", "age", "movies"]
  return atributtes.includes(field)
}
function getAValidCharacterFieldIfExists(field) {
  if (isAValidCharacterField(field)) {
    switch (field) {
      case "name":
        return "nombre"
      case "age":
        return "edad"
      case "movies":
        return "peliculas"

      default:
        return field
    }
  }
  else {
    throw crearErrorArgumentosInvalidos("query field", "doesnt exist in character")
  }
}

function isAssociationCharacterField(field) {
  const associateQueries = ["movieId", "peliculaId","movies"]
  return associateQueries.includes(field)
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
  if (!data.peliculas || Object.keys(data.peliculas).length === 0) {
    data.peliculas = [];
    return new CharacterModel(data);
  } else {
    return new CharacterModel(data);
  }
}

function getMyMoviesPretty(data) {
  const { id, imagen, titulo, fechaCreacion } = data;
  return { id, imagen, titulo, fechaCreacion };
}

function recoverCharactersList(list) {
  return list.map(character => {
    return recoverCharacterModel(character)
  });
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

function prepareFieldsToModifyInCharacterModel(input) {
  if (Object.keys(input).length < 1) {
    throw crearErrorArgumentosInvalidos("changes", "empty object")
  }
  const modificables = ["imagen", "nombre", "edad", "peso", "historia"]
  let result = {}
  for (const key in input) {
    if (!modificables.includes(key)) {
      throw crearErrorArgumentosInvalidos(key, "is not a valid field");
    } else {
      result[key] = input[key]
    }
  }
  return result
}

module.exports = {
  buildCharacterModel,
  recoverCharacterModel,
  prepareFieldsToModifyInCharacterModel,
  recoverCharactersList,
  getAValidCharacterFieldIfExists,
  isAssociationCharacterField,
  isAValidCharacterField
};
