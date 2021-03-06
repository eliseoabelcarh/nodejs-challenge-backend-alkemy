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
const { baseCharacter, baseMovie, baseGenero } = require("../models/examples");
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
    }
  });

  afterEach(async () => {
    if (strategyAuth === "jwt") {
      await server.close();
    }
  });

  it("POST request to create Movie without characters- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response.data.success, true);
    }
  });
  it("POST requestto create Movie and Recover with ID generated- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id
      const response2 = await clienteRest.getMovieWithId(token, idMovieSavedInDB);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("POST request to add Character to a Movie - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id
      // POST /movies/:idMovie/characters   body = personaje
      const response2 = await clienteRest.addCharacterToMovie(token, idMovieSavedInDB, baseCharacter);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("POST request to add Character to Movie with CharacterID- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      // I add a movie to get ID
      const response = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      // I add a character to get ID
      const response1 = await clienteRest.addCharacter(token, baseCharacter);
      assert.deepStrictEqual(response1.data.success, true);

      const idCharacterSavedInDB = response1.data.character.id

      // POST /movies/:idMovie/characters   body = characterId
      const response2 = await clienteRest.addCharacterToMovieWithIds(token, idMovieSavedInDB, idCharacterSavedInDB);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("DELETE request to delete Movie from DB- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      // DELETE /movies/:idMovie
      const response2 = await clienteRest.deleteMovie(token, idMovieSavedInDB);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("trying DELETE Movie alredy deleted from DB- throws error (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      // DELETE /movies/:idMovie
      const response2 = await clienteRest.deleteMovie(token, idMovieSavedInDB);
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
      assert.deepStrictEqual(response.data.success, true);

      const idMovieSavedInDB = response.data.movie.id

      // POST /movies/:idMovie/characters   body = personaje
      const response2 = await clienteRest.addCharacterToMovie(token, idMovieSavedInDB, baseCharacter);
      assert.deepStrictEqual(response2.data.success, true);

      const characterCreatedInDB = response2.data.character

      const parentID = idMovieSavedInDB
      const elementToRemoveID = characterCreatedInDB.id

      //   DELETE /movies/:movieId/characters?characterId=xxxx
      const response3 = await clienteRest.removeCharacterFromMovie(token, parentID, elementToRemoveID);
      assert.deepStrictEqual(response3.data.success, true);
    }
  });
  it("UPDATE request to update Field from Movie in DB- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      // UPDATE /movies/:idmovie   body= {field, value}
      // for Reference: const {imagen,titulo,fechaCreacion,calificacion} = basemovie
      const changes = {
        titulo: "newUrlLocation",
        calificacion: 5,
        //... you can add other fields
      }
      const response2 = await clienteRest.updateMovie(token, idMovieSavedInDB, changes);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it("UPDATE request to update Movie field/s with Empty object changes throws error (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id
      // UPDATE /movies/:idmovie   body= {field, value}
      // for Reference: const {imagen,titulo,fechaCreacion,calificacion} = basemovie
      const changes = {}
      await assert.rejects(
        async () => {
          await clienteRest.updateMovie(token, idMovieSavedInDB, changes);
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
      //I add one Movie
      const response = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id
      //I add another movie
      const response2 = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response2.data.success, true);
      const idMovieSavedInDB2 = response2.data.movie.id

      const response3 = await clienteRest.getAllMovies(token);
      assert.deepStrictEqual(response3.data.success, true);

      const listDB = response3.data.list
      const addedElementsIDs = [idMovieSavedInDB, idMovieSavedInDB2]
      const isFoundFirst = listDB.some(element => addedElementsIDs[0] === element.id)
      const isFoundSecond = listDB.some(element => addedElementsIDs[1] === element.id)
      assert.deepStrictEqual(isFoundFirst && isFoundSecond, true);
    }
  });

  it("GET request to get All Movies WITH name equals to something - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const movie1 = {
        imagen: "someURL",
        titulo: "Anaconda",
        fechaCreacion: Date.now().toString(),
        calificacion: 3,
      }

      //I add one Movie
      const response = await clienteRest.addMovie(token, movie1);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      //GET all movies with name "Anaconda", I should get at least 1 characters
      const field = "name"//also works with "titulo"
      const value = "Anaconda"
      const response3 = await clienteRest.getMoviesMatchWith(token, field, value);
      assert.deepStrictEqual(response3.data.success, true);
      assert.deepStrictEqual(response3.data.list.length >= 1, true);
    }
  });
  it("GET request to get All Movies WITH genre/movieGenreID equals to something - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      // I add a movie to get ID
      const response1 = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response1.data.success, true);
      const idMovieSavedInDB1 = response1.data.movie.id

      // I add another movie to get ID
      const response2 = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response2.data.success, true);
      const idMovieSavedInDB2 = response2.data.movie.id

      const response3 = await clienteRest.addMovieGenre(token, baseGenero);
      assert.deepStrictEqual(response3.data.success, true);
      const idMovieGenreSavedInDB = response3.data.movieGenre.id

      // I add first movie created to a specific movieGenre
      const response4 = await clienteRest.addMovieToMovieGenreWithIds(token, idMovieGenreSavedInDB, idMovieSavedInDB1);
      assert.deepStrictEqual(response4.data.success, true);

      // I add second movie created to a specific movieGenre
      const response5 = await clienteRest.addMovieToMovieGenreWithIds(token, idMovieGenreSavedInDB, idMovieSavedInDB2);
      assert.deepStrictEqual(response5.data.success, true);

      //GET all movies with name "Anaconda", I should get at least 1 characters
      const field = "genre"//also works with "genre" or "movieGenre" or "movieGenreId"
      const value = idMovieGenreSavedInDB
      const response6 = await clienteRest.getMoviesMatchWith(token, field, value);
      assert.deepStrictEqual(response6.data.success, true);
      assert.deepStrictEqual(response6.data.list.length >= 2, true);
    }
  });

  it("GET request to get All Movies WITH order=ASC|DESC - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      // I add a movie to get ID
      const response1 = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response1.data.success, true);
      const idMovieSavedInDB1 = response1.data.movie.id

      //GET all movies WITH order=ASC
      //I should get in first place the last movie I add before
      const field = "order"//required this specific word
      //DESC m??s nuevo primero
      //ASC m??s antiguo primero
      const value = "DESC"//by Default is order by id (createdAt)
      const response6 = await clienteRest.getMoviesMatchWith(token, field, value);
      assert.deepStrictEqual(response6.data.success, true);
      const listaElements = response6.data.list
      const firstInList = listaElements[0] 
      assert.deepStrictEqual(firstInList.id, idMovieSavedInDB1);
    }
  });
  it("GET request to get All Movies WITH order=ASC|DESC - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      // I add a movie to get ID
      const response1 = await clienteRest.addMovie(token, baseMovie);
      assert.deepStrictEqual(response1.data.success, true);
      const idMovieSavedInDB1 = response1.data.movie.id

      //GET all movies WITH order=ASC
      //I should get in first place the last movie I add before
      const field = "order"//required this specific word
      //DESC m??s nuevo primero
      //ASC m??s antiguo primero
      const value = "ASC"//by Default: order by ASC(createdAt)
      const response6 = await clienteRest.getMoviesMatchWith(token, field, value);
      assert.deepStrictEqual(response6.data.success, true);
      const listaElements = response6.data.list
      const lastIndex = listaElements.length - 1
      const LastInList = listaElements[lastIndex] 
      assert.deepStrictEqual(LastInList.id, idMovieSavedInDB1);
    }
  });


});