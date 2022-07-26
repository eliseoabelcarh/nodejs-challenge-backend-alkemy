const { assert, expect } = require("chai");
const { baseMovie } = require("./examples");
const { buildMovieModel } = require("../../src/models/movieModel");

describe.only("Movie Model", () => {
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
    const personajesIds = movieCreated.personajesIds;
    const esUnArray = Array.isArray(personajesIds);
    const arrayEstaVacio = personajesIds.length === 0;
    assert.deepStrictEqual(esUnArray, true);
    assert.deepStrictEqual(arrayEstaVacio, true);
  });

  it("If no argument provided for add PErsonaje or Serie Id", () => {
    expect(() => {
      movieCreated.addPersonajeId();
    }).to.throws("empty personaje id: no arguments provided");
  });

  it("If argument provided is Empty/Zero/False to add Personaje or Serie Id throws error", () => {
    expect(() => {
      movieCreated.addPersonajeId("");
    }).to.throws("Personaje Id: required field");
    expect(() => {
      movieCreated.addPersonajeId(false);
    }).to.throws("Personaje Id: required field");
    expect(() => {
      movieCreated.addPersonajeId(0);
    }).to.throws("Personaje Id: required field");
  });

  it("Build movie model", () => {
    const personajesIds = movieCreated.personajesIds;
    const esUnArray = Array.isArray(personajesIds);
    const arrayEstaVacio = personajesIds.length === 0;
    assert.deepStrictEqual(esUnArray, true);
    assert.deepStrictEqual(arrayEstaVacio, true);
  });

});
