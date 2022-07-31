const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { v4: uuidv4 } = require("uuid");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

/**
 * ------------------------------------ MOVIE GENRE MODEL ----------------------------------
 * This could be define as an JS Object to be consistent with all my developing work until now,
 * but I decide to make it with JS Classes just for change a little. The architecture and performance is
 * not affected, and if you change to another type of object, you can do it, and the only file
 * affected it was here.  
 */
class MovieGenreModel {
  constructor({ id, nombre, imagen, peliculas }) {
    //This field ID is used for maintain full control about ids,REGARDLESS of the database we use
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.peliculas = peliculas;
  }
  addPelicula(pelicula) {
    validatePelicula(pelicula);
    this.peliculas.push(pelicula);
  }
}
/**
 * ------------------------- RECOVER FUNCTION -------------------------------------
 * This function is used to validate data, clean and recover fields when we get it from
 * any database. Especially if database add extra fields when save it in tables for SQL databases
 * or in objects for example in noSql databases cases for example. Some extra fields are:
 * createdAt, _id, uuid, etc
 */
 function recoverMovieGenreModel(data) {
  validRequiredFields(data);
  if (!data.id) {
    throw crearErrorArgumentosInvalidos("id", "required field");
  }
  if (!data.peliculas) {
    data.peliculas = []
  } else {
    const newArray = data.peliculas.map((movieDB) =>
      getMyMoviesPretty(movieDB)
    );
    data.peliculas = newArray;
  }
  return new MovieGenreModel(data);
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

function getMyMoviesPretty(data) {
  const { id, imagen, titulo, fechaCreacion } = data;
  return { id, imagen, titulo, fechaCreacion };
}

function recoverMovieGenreList(list) {
  return list.map(movieGenre => {
    return recoverMovieGenreModel(movieGenre)
  });
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

function prepareFieldsToModifyInMovieGenreModel(input) {
  if (Object.keys(input).length < 1) {
    throw crearErrorArgumentosInvalidos("changes", "empty object")
  }
  const modificables = ["imagen", "nombre"]
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
  buildMovieGenreModel,
  recoverMovieGenreModel,
  prepareFieldsToModifyInMovieGenreModel,
  recoverMovieGenreList
};
