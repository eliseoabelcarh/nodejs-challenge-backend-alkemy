const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

/**
 * ------------------------------------ MOVIE MODEL ----------------------------------
 * This could be define as an JS Object to be consistent with all my developing work until now,
 * but I decide to make it with JS Classes just for change a little. The architecture and performance is
 * not affected, and if you change to another type of object, you can do it, and the only file
 * affected it was here.  
 */
const CALIFICACION_MINIMA = 1;
const CALIFICACION_MAXIMA = 5;
class MovieModel {
  constructor({ id, imagen, titulo, fechaCreacion, calificacion, personajes }) {
    //This field ID is used for maintain full control about ids,REGARDLESS of the database we use
    this.id = id;
    this.imagen = imagen;
    this.titulo = titulo;
    this.fechaCreacion = fechaCreacion;
    this.calificacion = calificacion;
    this.personajes = personajes;
  }
  addPersonaje(personaje) {
    validatePersonaje(personaje);
    this.personajes.push(personaje);
  }
  hasCharacter(characterId) {
    let i = 0
    let founded = null
    while (i < this.personajes.length && !founded) {
      if (this.personajes[i].id === characterId) {
        founded = this.personajes[i]
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
function recoverMovieModel(data) {
  validRequiredFields(data);
  if (!data.id) {
    throw crearErrorArgumentosInvalidos("id", "required field");
  }
  if (!data.personajes) {
    data.personajes = [];
  }
  else {
    const newArray = data.personajes.map((characterDB) =>
      getMyCharactersPretty(characterDB)
    )
    data.personajes = newArray
  }
  return new MovieModel(data);
}
function isAValidMovieField(field) {
  const atributtes = ["id", "imagen", "titulo", "fechaCreacion", "calificacion", "personajes", "name", "genre", "movieGenre", "movieGenreId"]
  return atributtes.includes(field)
}

function getAValidMovieFieldIfExists(field) {
  if (isAValidMovieField(field)) {
    switch (field) {
      case "name":
        return "titulo"
      case "genre":
        return "movieGenreId"
      case "movieGenre":
        return "movieGenreId"

      default:
        return field
    }
  }
  else {
    throw crearErrorArgumentosInvalidos("query field", "doesnt exist in character")
  }
}

function isAssociationMovieField(field) {
  const associateQueries = ["characterId", "personajeId"]
  return associateQueries.includes(field)
}

function validatePersonaje(personaje) {
  const argumentReceived = arguments[0];
  if (argumentReceived === undefined) {
    throw crearErrorArgumentosInvalidos(
      "empty personaje",
      "no arguments provided"
    );
  }
  if (!personaje) {
    throw crearErrorArgumentosInvalidos("Personaje", "required field");
  }
}

function buildMovieModel(data) {
  validRequiredFields(data);
  data.id = uuidv4();
  if (!data.personajes) {
    data.personajes = [];
    return new MovieModel(data);
  } else {
    return new MovieModel(data);
  }
}

function getMyCharactersPretty(characterDB) {
  const { id, nombre, imagen } = characterDB
  return { id, nombre, imagen }
}

function recoverMoviesList(list) {
  return list.map(movie => {
    return recoverMovieModel(movie)
  });
}


function validRequiredFields(data) {
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
  if (isNaN(data.calificacion)) {
    throw crearErrorArgumentosInvalidos("calificacion", "is not a number");
  }
  if (
    data.calificacion > CALIFICACION_MAXIMA ||
    data.calificacion < CALIFICACION_MINIMA
  ) {
    throw crearErrorArgumentosInvalidos("calificacion", "wrong valuee");
  }
}

function prepareFieldsToModifyInMovieModel(input) {
  if (Object.keys(input).length < 1) {
    throw crearErrorArgumentosInvalidos("changes", "empty object")
  }
  const modificables = ["imagen", "titulo", "fechaCreacion", "calificacion"]
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
  buildMovieModel,
  recoverMovieModel,
  prepareFieldsToModifyInMovieModel,
  recoverMoviesList,
  getAValidMovieFieldIfExists,
  isAssociationMovieField,
  isAValidMovieField
};
