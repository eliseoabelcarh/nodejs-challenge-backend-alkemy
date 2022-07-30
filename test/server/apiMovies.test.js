const { createServer } = require("../../src/server/server");
var chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = require("assert");
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

describe("Server APIs for Movies", async () => {
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

  it("POST request /addMovie without characters- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
    }
  });
  it("POST request /addMovie and Recover with ID generated- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id
      const response2 = await clienteRest.getMovieWithId(token, idMovieSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("POST request to add Character to a Movie - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id
      // POST /movies/:idMovie/characters   body = personaje
      const response2 = await clienteRest.addCharacterToMovie(token, idMovieSavedInDB, baseCharacter);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("POST request to add Character to Movie with CharacterID- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      // we add a movie to get ID
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta000:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      // we add a character to get ID
      const response1 = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response1.data);
      assert.deepStrictEqual(response1.data.success, true);

      const idCharacterSavedInDB = response1.data.character.id

      // POST /movies/:idMovie/characters   body = characterId
      const response2 = await clienteRest.addCharacterToMovieWithIds(token, idMovieSavedInDB, idCharacterSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("DELETE request to delete Movie from DB- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      // DELETE /movies/:idMovie
      const response2 = await clienteRest.deleteMovie(token, idMovieSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("trying DELETE Movie alredy deleted from DB- throws error (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      // DELETE /movies/:idMovie
      const response2 = await clienteRest.deleteMovie(token, idMovieSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
      await assert.rejects(
        async () => {
          await clienteRest.deleteMovie(token, idMovieSavedInDB);
        },
        (err) => {
          assert.strictEqual(err.status, 404);
          return true;
        }
      )
    }
  });
  it("DELETE request to remove Character from Movie - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);

      const idMovieSavedInDB = response.data.movie.id

      // POST /movies/:idMovie/characters   body = personaje
      const response2 = await clienteRest.addCharacterToMovie(token, idMovieSavedInDB, baseCharacter);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);

      const characterCreatedInDB = response2.data.character

      const parentID = idMovieSavedInDB
      const elementToRemoveID = characterCreatedInDB.id

      //   DELETE /movies/:movieId/characters?characterId=xxxx
      const response3 = await clienteRest.removeCharacterFromMovie(token, parentID, elementToRemoveID);
      console.log("Rspta33333:", response3.data);
      assert.deepStrictEqual(response3.data.success, true);
    }
  });
  it("UPDATE request to update Field from Movie in DB- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      // UPDATE /movies/:idmovie   body= {field, value}
      // for Reference: const {imagen,titulo,fechaCreacion,calificacion} = basemovie
      const changes = {
        titulo: "newUrlLocation",
        calificacion:5,
        //... you can add other fields
      }
      const response2 = await clienteRest.updateMovie(token,idMovieSavedInDB, changes);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("UPDATE request to update Movie field/s with Empty object changes throws error (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id
      // UPDATE /movies/:idmovie   body= {field, value}
      // for Reference: const {imagen,titulo,fechaCreacion,calificacion} = basemovie
      const changes = {}
      await assert.rejects(
        async () => {
          await clienteRest.updateMovie(token,idMovieSavedInDB, changes);
        },
        (err) => {
          assert.strictEqual(err.status, 400);
          assert.strictEqual(err.message, 'changes: empty object');
          return true;
        }
      )
    }
  });
  it("GET request to get All Movies - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      //We add one Movie
      const response = await clienteRest.addMovie(token, baseMovie);
     // console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id
      //We add another movie
      const response2 = await clienteRest.addMovie(token, baseMovie);
     // console.log("Rspta111:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
      const idMovieSavedInDB2 = response2.data.movie.id

      const response3 = await clienteRest.getAllMovies(token);
     // console.log("Rspta3:", response3.data);
      assert.deepStrictEqual(response3.data.success, true);

      const listDB = response3.data.list
      const addedElementsIDs = [idMovieSavedInDB,idMovieSavedInDB2] 
      const isFoundFirst = listDB.some(element => addedElementsIDs[0] === element.id)
      const isFoundSecond = listDB.some(element => addedElementsIDs[1] === element.id)
      assert.deepStrictEqual(isFoundFirst&&isFoundSecond, true);
    }
  });

});