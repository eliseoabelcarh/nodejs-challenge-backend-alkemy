const { assert, expect } = require("chai");
const { baseMovie } = require("./examples");
const { buildMovieModel } = require("../../src/models/movieModel");

describe("Movie Model", () => {
  let movieCreated;

  before(() => {
    console.log("mnsbjdsads", baseMovie)
    movieCreated = buildMovieModel(baseMovie);
  });

  it("If no arguments provided throws error", () => {
    expect(() => {
      buildMovieModel();
    }).to.throws("empty data: no arguments provided");
  });
  it("Id must be created for new Movie and id doesnt be empty", () => {
    const haveId = movieCreated.hasOwnProperty("id");
    assert.deepStrictEqual(haveId, true);
    const chars = movieCreated.id.length > 0;
    assert.deepStrictEqual(chars, true);
  });
  it("If some missing arguments provided throws error", () => {
    const requeridos = ["imagen", "titulo", "fechaCreacion", "calificacion"];
    requeridos.forEach((required) => {
      let example = { ...baseMovie };
      delete example[required];
      expect(() => {
        buildMovieModel(example);
      }).to.throws(`${required}: required field`);
    });
  });

  it("Empty Array of Personakes Ids must be created for movie model", () => {
    const personajes = movieCreated.personajes;
    const esUnArray = Array.isArray(personajes);
    const arrayEstaVacio = personajes.length === 0;
    assert.deepStrictEqual(esUnArray, true);
    assert.deepStrictEqual(arrayEstaVacio, true);
  });

  it("If no argument provided for add PErsonaje or Serie Id", () => {
    expect(() => {
      movieCreated.addPersonaje();
    }).to.throws("empty personaje: no arguments provided");
  });

  it("If argument provided is Empty/Zero/False to add Personaje or Serie Id throws error", () => {
    expect(() => {
      movieCreated.addPersonaje("");
    }).to.throws("Personaje: required field");
    expect(() => {
      movieCreated.addPersonaje(false);
    }).to.throws("Personaje: required field");
    expect(() => {
      movieCreated.addPersonaje(0);
    }).to.throws("Personaje: required field");
  });

  it("Build movie model", () => {
    const personajes = movieCreated.personajes;
    const esUnArray = Array.isArray(personajes);
    const arrayEstaVacio = personajes.length === 0;
    assert.deepStrictEqual(esUnArray, true);
    assert.deepStrictEqual(arrayEstaVacio, true);
  });

});
