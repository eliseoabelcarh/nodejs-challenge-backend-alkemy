const { createServer } = require("../../src/server/server");
var chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = require("assert");
const { expect } = require("chai");
require("dotenv").config();
const { crearclienteREST } = require("./clientREST");
const { configurations } = require("../../src/configurations/configs");
const genRandValue = (len) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};
const { baseCharacter, baseMovie } = require("../models/examples");
const { buildCharacterModel } = require("../../src/models/characterModel");
const { buildMovieModel } = require("../../src/models/movieModel");

describe("Server APIs for Character", async () => {
  const emptyObject = {};
  let server;
  let clienteRest;
  const strategyAuth = configurations.getStrategyAuth();
  let user;
  let token;

  beforeEach(async function () {
    if (strategyAuth === "jwt") {
      server = await createServer(emptyObject);
      port = server.address().port;
      clienteRest = crearclienteREST(port);
      const randString = genRandValue(8);
      user = { username: `username${randString}@test.com`, password: "daasf" };
      const response = await clienteRest.register(user);
      //const response = await clienteRest.login(user);
      token = response.data.token;
      console.log("token recibidoo en test::::: ", token);
    }
  });

  afterEach(async () => {
    if (strategyAuth === "jwt") {
      await server.close();
    }
  });

  it("POST request to create Character without movies - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta2:", response.data);
      assert.deepStrictEqual(response.data.success, true);
    }
  });
  it("POST request to create Character and Recover with ID generated- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB = response.data.character.id
      const response2 = await clienteRest.getCharacterWithId(token, idCharacterSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("POST request to add Movie to Character - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);

      const idCharacterSavedInDB = response.data.character.id

      // POST /characters/:idCharacter/movies   body = pelicula
      const response2 = await clienteRest.addMovieToCharacter(token, idCharacterSavedInDB, baseMovie);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("DELETE request to delete Character from DB- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB = response.data.character.id

      // DELETE /characters/:idCharacter
      const response2 = await clienteRest.deleteCharacter(token, idCharacterSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("trying DELETE Character alredy deleted from DB- throws error (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB = response.data.character.id

      // DELETE /characters/:idCharacter
      const response2 = await clienteRest.deleteCharacter(token, idCharacterSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
      await assert.rejects(
        async () => {
          await clienteRest.deleteCharacter(token, idCharacterSavedInDB)
        },
        (err) => {
          assert.strictEqual(err.status, 404);
          return true;
        }
      );

    }
  });

  it("DELETE request to remove Movie from Character - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);

      const idCharacterSavedInDB = response.data.character.id

      // POST /characters/:idCharacter/movies   body = pelicula
      const response2 = await clienteRest.addMovieToCharacter(token, idCharacterSavedInDB, baseMovie);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);

      const movieCreatedInDB = response2.data.movie

      const parentID = idCharacterSavedInDB
      const elementToRemoveID = movieCreatedInDB.id

      // DELETE /characters/:characterId/movies?movieId=xxxxx
      const response3 = await clienteRest.removeMovieFromCharacter(token, parentID, elementToRemoveID);
      console.log("Rspta33333:", response3.data);
      assert.deepStrictEqual(response3.data.success, true);
    }
  });
  it("UPDATE request to update Field from Character in DB- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB = response.data.character.id

      // UPDATE /characters/:idCharacter   body= {field, value}
      // for Reference: const {imagen,nombre,edad,peso,historia} = baseCharacter
      const changes = {
        imagen: "newUrlLocation",
        nombre: "newName",
        //... you can add other fields
      }
      const response2 = await clienteRest.updateCharacter(token, idCharacterSavedInDB, changes);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("UPDATE request to update Character field/s with Empty object changes throws error (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB = response.data.character.id

      // UPDATE /characters/:idCharacter   body= {field, value}
      // for Reference: const {imagen,nombre,edad,peso,historia} = baseCharacter
      const changes = {}
      await assert.rejects(
        async () => {
          await clienteRest.updateCharacter(token, idCharacterSavedInDB, changes);
        },
        (err) => {
          assert.strictEqual(err.status, 400);
          assert.strictEqual(err.message, 'changes: empty object');
          return true;
        }
      )
    }
  });
  it.only("GET request to get All Characters - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      //We add one character
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB = response.data.character.id
      //We add another character
      const response2 = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
      const idCharacterSavedInDB2 = response2.data.character.id

      const response3 = await clienteRest.getAllCharacters(token);
      console.log("Rspta3:", response3.data);
      assert.deepStrictEqual(response3.data.success, true);

      const addedElements = [idCharacterSavedInDB,idCharacterSavedInDB2] 
      const incluidoEnAddedElements = addedElements.includes()

    }
  });

});

