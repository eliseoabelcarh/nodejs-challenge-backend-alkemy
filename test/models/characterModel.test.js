const { assert, expect } = require("chai");
require("chai").use(require("chai-as-promised")).should();

const { baseCharacter } = require("./examples");
const { createCharacterModel } = require("../../src/models/characterModel");

describe("Character Model", () => {
  let characterCreated;

  before(() => {
    characterCreated = createCharacterModel(baseCharacter);
  });

  it("If no arguments provided throws error", () => {
    expect(() => {
      createCharacterModel();
    }).to.throws("empty data: no arguments provided");
  });
  it("Id must be created for new Character and id doesnt be empty", () => {
    const haveId = characterCreated.hasOwnProperty("id");
    assert.deepStrictEqual(haveId, true);
    const chars = characterCreated.id.length > 0;
    assert.deepStrictEqual(chars, true);
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
    const listaPeliculasOSeriesIds = characterCreated.peliculasOSeriesIds;
    const esUnArray = Array.isArray(listaPeliculasOSeriesIds);
    const arrayEstaVacio = listaPeliculasOSeriesIds.length === 0;
    assert.deepStrictEqual(esUnArray, true);
    assert.deepStrictEqual(arrayEstaVacio, true);
  });

  it("If no argument provided for add Movie or Serie Id", () => {
    expect(() => {
      characterCreated.addMovieOrSerieId();
    }).to.throws("empty movie or serie id: no arguments provided");
  });

  it("If argument provided is Empty/Zero/False to add Movie or Serie Id throws error", () => {
    expect(() => {
      characterCreated.addMovieOrSerieId("");
    }).to.throws("Movie/Serie Id: required field");
    expect(() => {
      characterCreated.addMovieOrSerieId(false);
    }).to.throws("Movie/Serie Id: required field");
    expect(() => {
      characterCreated.addMovieOrSerieId(0);
    }).to.throws("Movie/Serie Id: required field");
  });
});
