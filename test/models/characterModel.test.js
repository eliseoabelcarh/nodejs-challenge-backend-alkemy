const { assert, expect } = require("chai");
const {
  crearErrorArgumentosInvalidos,
} = require("../../src/errors/errorsHandler");
require("chai").use(require("chai-as-promised")).should();

const { baseCharacter,baseMovie,baseGenero } = require("./examples");
const { createCharacterModel } = require("../../src/models/characterModel");

describe("Character Model", () => {
  it("If no arguments provided throws error", () => {
    expect(() => {
      createCharacterModel();
    }).to.throws("empty data: no arguments provided");
  });
  it("If some missing arguments provided throws error", () => {
    const requeridos = ["imagen", "nombre", "edad", "peso", "historia"];
    requeridos.forEach((required) => {
      let example = { ...baseCharacter };
      delete example[required];
      expect(() => {
        createCharacterModel(example);
      }).to.throws(`${required}: required field`);
    });
  });
  it("Empty Array of Series/Movies Ids must be created for character model", () => {
    const characterCreated = createCharacterModel(baseCharacter)
    const listaPeliculasOSeriesIds = characterCreated.peliculasOSeriesIds
    const esUnArray =  Array.isArray(listaPeliculasOSeriesIds)
    const arrayEstaVacio = listaPeliculasOSeriesIds.length === 0
    assert.deepStrictEqual(esUnArray,true)
    assert.deepStrictEqual(arrayEstaVacio,true)
  });
  it("If no argument provided for add Movie or Serie Id", () => {
    const characterCreated = createCharacterModel(baseCharacter)
    expect(() => {
        characterCreated.addMovieOrSerieId()
      }).to.throws("empty movie or serie id: no arguments provided");
      expect(() => {
        characterCreated.addMovieOrSerieId("")
      }).to.throws("empty movie or serie id: no arguments provided");
  })
});
