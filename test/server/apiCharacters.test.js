var chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = require("assert");
const { createServer } = require("../../src/server/server");
const { crearclienteREST } = require("./clientREST");
const { buildCharacterModel } = require("../../src/models/characterModel");
const { configurations } = require("../../src/configurations/configs");
const { baseCharacter, baseMovie } = require("../models/examples");

/**
 *  --------------------  FUNCTION FOR CREATE RANDOM STRING ---------------------
 * I use for generate different users or characters details
 */
const genRandValue = (len) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};



describe("Testing APIs for Character", async () => {
  /**
   * This tests works only if JWT strategy for authentication is configurated
   * You can set configurations in Configurations folder
   */
  let server;
  let clienteRest;
  let user;
  let token;
  const emptyObject = {};
  const strategyAuth = configurations.getStrategyAuth();

  beforeEach(async function () {
    if (strategyAuth === "jwt") {
      server = await createServer(emptyObject);
      port = server.address().port;
      clienteRest = crearclienteREST(port);
      //I create a random user for test only
      //email could be sent when you register a user
      const randString = genRandValue(8);
      user = { username: `username${randString}@test.com`, password: "daasf" };
      // Yoyu can use also LOGIN for get a Authentication Token 
      //const response = await clienteRest.login(user);
      const response = await clienteRest.register(user);
      token = response.data.token;
    }
  });

  afterEach(async () => {
    if (strategyAuth === "jwt") {
      //I close every server after testing to avoid busy ports
      await server.close();
    }
  });

  it("POST request to create Character without movies - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
      assert.deepStrictEqual(response.data.success, true);
    }
  });
  it("POST request to create Character and Recover with ID generated- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const response = await clienteRest.addCharacter(token, baseCharacter);
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
  it("POST request to add Movie to Character with MovieID- Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      // I add a movie to get ID
      const response = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta000:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idMovieSavedInDB = response.data.movie.id

      const response1 = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response1.data);
      assert.deepStrictEqual(response1.data.success, true);

      const idCharacterSavedInDB = response1.data.character.id

      // POST /characters/:idCharacter/movies   body = movieId
      const response2 = await clienteRest.addMovieToCharacterWithIds(token, idCharacterSavedInDB, idMovieSavedInDB);
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
        peso: 75.25,
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
      const changes = emptyObject
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
  it("GET request to get All Characters - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      //I add one character
      const response = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB = response.data.character.id
      //I add another character
      const response2 = await clienteRest.addCharacter(token, baseCharacter);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
      const idCharacterSavedInDB2 = response2.data.character.id

      const response3 = await clienteRest.getAllCharacters(token);
      console.log("Rspta333333333x3:", response3.data);
      assert.deepStrictEqual(response3.data.success, true);

      const listDB = response3.data.list
      const addedElementsIDs = [idCharacterSavedInDB, idCharacterSavedInDB2]
      const isFoundFirst = listDB.some(element => addedElementsIDs[0] === element.id)
      const isFoundSecond = listDB.some(element => addedElementsIDs[1] === element.id)
      assert.deepStrictEqual(isFoundFirst && isFoundSecond, true);

    }
  });

  it("GET request to get All Characters WITH name equals to something - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const character1 = {
        imagen: "AAAAAA",
        nombre: "Paracleto",
        edad: 35,
        peso: 65.25,
        historia: "some",
      }
      const character2 = {
        imagen: "BBBBBB",
        nombre: "Paracleto",
        edad: 45,
        peso: 75,
        historia: "some",
      }
      //I add one character
      const response = await clienteRest.addCharacter(token, character1);
      // console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB = response.data.character.id
      //I add another character
      const response2 = await clienteRest.addCharacter(token, character2);
      // console.log("Rspta111:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
      const idCharacterSavedInDB2 = response2.data.character.id

      //GET all characters with name "Paracleto", I should get at least 2 characters
      const field = "name"//also works with "nombre"
      const value = "Paracleto"
      const response3 = await clienteRest.getCharactersMatchWith(token, field, value);
      console.log("Rspta3:", response3.data.list);
      assert.deepStrictEqual(response3.data.success, true);
      assert.deepStrictEqual(response3.data.list.length >= 2, true);
    }
  });
  it("GET request to get All Characters WITH age equals to something - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      const character1 = {
        imagen: "AAAAAA",
        nombre: "Jose",
        edad: 77,
        peso: 65.25,
        historia: "some",
      }
      const character2 = {
        imagen: "BBBBBB",
        nombre: "Tomas",
        edad: 77,
        peso: 75,
        historia: "some",
      }
      //I add one character
      const response = await clienteRest.addCharacter(token, character1);
      // console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB = response.data.character.id
      //I add another character
      const response2 = await clienteRest.addCharacter(token, character2);
      // console.log("Rspta111:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
      const idCharacterSavedInDB2 = response2.data.character.id

      //GET all characters with age 77, I should get at least 2 characters
      const field = "age" //also works with "edad"
      const value = 77
      const response3 = await clienteRest.getCharactersMatchWith(token, field, value);
      console.log("Rspta3:", response3.data.list);
      assert.deepStrictEqual(response3.data.success, true);
      assert.deepStrictEqual(response3.data.list.length >= 2, true);
    }
  });

  it("GET request to get All Characters WITH movieId equals to something - Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
      //I add one character
      const response = await clienteRest.addCharacter(token, baseCharacter);
      // console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const idCharacterSavedInDB1 = response.data.character.id

      // I add a movie to database
      const response3 = await clienteRest.addMovie(token, baseMovie);
      console.log("Rspta3:", response3.data);
      assert.deepStrictEqual(response3.data.success, true);
      const idMovieSavedInDB = response3.data.movie.id

      //I associate both IDs in database
      const response2 = await clienteRest.addMovieToCharacterWithIds(token, idCharacterSavedInDB1, idMovieSavedInDB);
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);

      //I add another character
      const response5 = await clienteRest.addCharacter(token, baseCharacter);
      // console.log("Rspta5:", response5.data);
      assert.deepStrictEqual(response5.data.success, true);
      const idCharacterSavedInDB2 = response5.data.character.id

      //I associate new characer ID with movie already created in database
      const response6 = await clienteRest.addMovieToCharacterWithIds(token, idCharacterSavedInDB2, idMovieSavedInDB);
      console.log("Rspta6:", response6.data);
      assert.deepStrictEqual(response6.data.success, true);

      //GET all characters with specific movieId, I should get at least 2 result
      const field = "movieId"
      const value = idMovieSavedInDB
      const response4 = await clienteRest.getCharactersMatchWith(token, field, value);
      //console.log("Rspta4:", response4.data.list);
      assert.deepStrictEqual(response4.data.success, true);
      assert.deepStrictEqual(response4.data.list.length >= 2, true);

      const listDB = response4.data.list

      //All characters must have a movie with movieId sent
      console.log("LISTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", listDB)
      const isFound = listDB.every(element => {
        const character = buildCharacterModel(element)
        return character.hasMovie(idMovieSavedInDB)
      })
      console.log("sifoundddddddd", isFound)
      assert.deepStrictEqual(isFound, true);
    }
  });



});

