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
const {  baseGenero } = require("../models/examples");

const { buildMovieGenreModel } = require("../../src/models/movieGenreModel");

describe("Server APIs for Movie Genres", async () => {
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

  it.only("POST request /addMovieGenre without characters- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
    }
  });
  it.only("POST request /addMovieGenre and Recover with ID generated- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieGenreSavedInDB = response.data.movieGenre.id
      const response2 = await clienteRest.getMovieGenreWithId(token,idMovieGenreSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });

});