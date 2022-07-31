const { assert, expect } = require("chai");
const { baseGenero } = require("./examples");
const { buildMovieGenreModel } = require("../../src/models/movieGenreModel");

describe("Movie Genre Model", () => {
  let movieGenreCreated;

  before(() => {
    movieGenreCreated = buildMovieGenreModel(baseGenero);
  });

  it("If no arguments provided throws error", () => {
    expect(() => {
      buildMovieGenreModel();
    }).to.throws("empty data: no arguments provided");
  });
  it("Id must be created for new Movie and id doesnt be empty", () => {
    const haveId = movieGenreCreated.hasOwnProperty("id");
    assert.deepStrictEqual(haveId, true);
    const chars = movieGenreCreated.id.length > 0;
    assert.deepStrictEqual(chars, true);
  });
  it("If some missing arguments provided throws error", () => {
    const requeridos = ["nombre", "imagen"];
    requeridos.forEach((required) => {
      let example = { ...baseGenero };
      delete example[required];
      expect(() => {
        buildMovieGenreModel(example);
      }).to.throws(`${required}: required field`);
    });
  });

  it("Empty Array of Personakes Ids must be created for movie model", () => {
    const peliculas = movieGenreCreated.peliculas;
    const esUnArray = Array.isArray(peliculas);
    const arrayEstaVacio = peliculas.length === 0;
    assert.deepStrictEqual(esUnArray, true);
    assert.deepStrictEqual(arrayEstaVacio, true);
  });

  it("If no argument provided for add Movie or Serie", () => {
    expect(() => {
      movieGenreCreated.addPelicula();
    }).to.throws("empty movie: no arguments provided");
  });

  it("If argument provided is Empty/Zero/False to add Personaje or Serie Id throws error", () => {
    expect(() => {
      movieGenreCreated.addPelicula("");
    }).to.throws("Movie: required field");
    expect(() => {
      movieGenreCreated.addPelicula(false);
    }).to.throws("Movie: required field");
    expect(() => {
      movieGenreCreated.addPelicula(0);
    }).to.throws("Movie: required field");
  });

  it("Build movie model", () => {
    const peliculas = movieGenreCreated.peliculas;
    const esUnArray = Array.isArray(peliculas);
    const arrayEstaVacio = peliculas.length === 0;
    assert.deepStrictEqual(esUnArray, true);
    assert.deepStrictEqual(arrayEstaVacio, true);
  });

});
