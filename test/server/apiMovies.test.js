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
      console.log("token recibidoo en test::::: ", token);
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
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
    }
  });
  it("POST requestto create Movie and Recover with ID generated- Success on (PROTECTED JWT ROUTE)", async () => {
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
        calificacion: 5,
        //... you can add other fields
      }
      const response2 = await clienteRest.updateMovie(token, idMovieSavedInDB, changes);
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

      //We add one Movie
      const response = await clienteRest.addMovie(token, movie1);
      // console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      //GET all movies with name "Anaconda", we should get at least 1 characters
      const field = "name"//also works with "titulo"
      const value = "Anaconda"
      const response3 = await clienteRest.getMoviesMatchWith(token, field, value);
      console.log("Rspta3:", response3.data.list);
      assert.deepStrictEqual(response3.data.success, true);
      assert.deepStrictEqual(response3.data.list.length >= 1, true);
    }
  });
  it("GET request to get All Movies WITH genre/movieGenreID equals to something - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      // we add a movie to get ID
      const response1 = await clienteRest.addMovie(token, baseMovie);
      console.log("response1:", response1.data);
      assert.deepStrictEqual(response1.data.success, true);
      const idMovieSavedInDB1 = response1.data.movie.id

      // we add another movie to get ID
      const response2 = await clienteRest.addMovie(token, baseMovie);
      console.log("response2:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
      const idMovieSavedInDB2 = response2.data.movie.id

      const response3 = await clienteRest.addMovieGenre(token, baseGenero);
      console.log("response3:", response3.data);
      assert.deepStrictEqual(response3.data.success, true);
      const idMovieGenreSavedInDB = response3.data.movieGenre.id

      // we add first movie created to a especific movieGenre
      const response4 = await clienteRest.addMovieToMovieGenreWithIds(token, idMovieGenreSavedInDB, idMovieSavedInDB1);
      console.log("response4:", response4.data);
      assert.deepStrictEqual(response4.data.success, true);

      // we add second movie created to a especific movieGenre
      const response5 = await clienteRest.addMovieToMovieGenreWithIds(token, idMovieGenreSavedInDB, idMovieSavedInDB2);
      console.log("response5:", response5.data);
      assert.deepStrictEqual(response5.data.success, true);

      //GET all movies with name "Anaconda", we should get at least 1 characters
      const field = "genre"//also works with "genre" or "movieGenre" or "movieGenreId"
      const value = idMovieGenreSavedInDB
      const response6 = await clienteRest.getMoviesMatchWith(token, field, value);
      console.log("response6:", response6.data.list);
      assert.deepStrictEqual(response6.data.success, true);
      assert.deepStrictEqual(response6.data.list.length >= 2, true);
    }
  });

  it("GET request to get All Movies WITH order=ASC|DESC - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      // we add a movie to get ID
      const response1 = await clienteRest.addMovie(token, baseMovie);
      console.log("response1:", response1.data);
      assert.deepStrictEqual(response1.data.success, true);
      const idMovieSavedInDB1 = response1.data.movie.id

      //GET all movies WITH order=ASC
      //we should get in first place the last movie we add before
      const field = "order"//required this especific word
      //DESC más nuevo primero
      //ASC más antiguo primero
      const value = "DESC"//by Default is order by id (createdAt)
      const response6 = await clienteRest.getMoviesMatchWith(token, field, value);
      console.log("response6:", response6.data.list);
      assert.deepStrictEqual(response6.data.success, true);
      const listaElements = response6.data.list
      const firstInList = listaElements[0] 
      console.log("BUSCADDOOOOOOOOO", idMovieSavedInDB1)
      assert.deepStrictEqual(firstInList.id, idMovieSavedInDB1);
    }
  });
  it("GET request to get All Movies WITH order=ASC|DESC - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      // we add a movie to get ID
      const response1 = await clienteRest.addMovie(token, baseMovie);
      console.log("response1:", response1.data);
      assert.deepStrictEqual(response1.data.success, true);
      const idMovieSavedInDB1 = response1.data.movie.id

      //GET all movies WITH order=ASC
      //we should get in first place the last movie we add before
      const field = "order"//required this especific word
      //DESC más nuevo primero
      //ASC más antiguo primero
      const value = "ASC"//by Default: order by ASC(createdAt)
      const response6 = await clienteRest.getMoviesMatchWith(token, field, value);
      console.log("response6:", response6.data.list);
      assert.deepStrictEqual(response6.data.success, true);
      const listaElements = response6.data.list
      const lastIndex = listaElements.length - 1
      const LastInList = listaElements[lastIndex] 
      console.log("BUSCADDOOOOOOOOO", idMovieSavedInDB1)
      assert.deepStrictEqual(LastInList.id, idMovieSavedInDB1);
    }
  });


});