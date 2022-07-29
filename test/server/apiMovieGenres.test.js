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
const { baseGenero, baseMovie } = require("../models/examples");


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

  it("POST request /addMovieGenre without characters- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
    }
  });
  it("POST request /addMovieGenre and Recover with ID generated- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieGenreSavedInDB = response.data.movieGenre.id
      const response2 = await clienteRest.getMovieGenreWithId(token, idMovieGenreSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("POST request to add Movie to a MovieGenre - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);

      const idMovieGenreSavedInDB = response.data.movieGenre.id

      // POST /movieGenres/:idMovieGenre/movies   body = pelicula
      const response2 = await clienteRest.addMovieToMovieGenre(token, idMovieGenreSavedInDB, baseMovie);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("DELETE request to delete Movie from DB- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieGenreSavedInDB = response.data.movieGenre.id

      // DELETE /movieGenres/:idMovieGenre
      const response2 = await clienteRest.deleteMovieGenre(token, idMovieGenreSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("trying DELETE MovieGenre alredy deleted from DB- throws error (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieGenreSavedInDB = response.data.movieGenre.id

      // DELETE /movieGenres/:idMovieGenre
      const response2 = await clienteRest.deleteMovieGenre(token, idMovieGenreSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
      await assert.rejects(
        async () => {
          await clienteRest.deleteMovieGenre(token, idMovieGenreSavedInDB);
        },
        (err) => {
          assert.strictEqual(err.status, 404);
          return true;
        }
      )
    }
  });
  it("DELETE request to remove Movie from MovieGenre - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);

      const idMovieGenreSavedInDB = response.data.movieGenre.id

      // POST /movieGenres/:idMovieGenre/movies   body = pelicula
      const response2 = await clienteRest.addMovieToMovieGenre(token, idMovieGenreSavedInDB, baseMovie);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);

      const movieCreatedInDB = response2.data.movie

      const parentID = idMovieGenreSavedInDB
      const elementToRemoveID = movieCreatedInDB.id

      //   DELETE /movieGenres/:movieGenreId/movies?movieId=xxxx
      const response3 = await clienteRest.removeMovieFromMovieGenre(token, parentID, elementToRemoveID);
      console.log("Rspta33333:", response3.data);
      assert.deepStrictEqual(response3.data.success, true);
    }
  });
  it("UPDATE request to update Field from MovieGenre in DB- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieGenreSavedInDB = response.data.movieGenre.id

      // UPDATE /movieGenres/:idmovieGenre   body= {field, value}
      // for Reference: const {nombre,imagen} = baseGenero
      const changes = {
        imagen: "newUrlLocation",
        //... you can add other fields
      }
      const response2 = await clienteRest.updateMovieGenre(token,idMovieGenreSavedInDB, changes);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("UPDATE request to update MovieGenre field/s with Empty object changes throws error (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieGenreSavedInDB = response.data.movieGenre.id
      // UPDATE /movieGenres/:idmovieGenre   body= {field, value}
      // for Reference: const {nombre,imagen} = baseGenero
      const changes = {}
      await assert.rejects(
        async () => {
          await clienteRest.updateMovieGenre(token,idMovieGenreSavedInDB, changes);
        },
        (err) => {
          assert.strictEqual(err.status, 400);
          assert.strictEqual(err.message, 'changes: empty object');
          return true;
        }
      )
    }
  });


});