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

});