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
const {baseCharacter, baseMovie} = require("../models/examples");
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
      console.log("token recibidoo en test::::: ", token)
    }
  });

  afterEach(async () => {
    if (strategyAuth === "jwt") {
      await server.close();
    }
  });

  it("POST request /addCharacter Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
       //const characterValido = buildCharacterModel(baseCharacter)
      const response = await clienteRest.addCharacter( token,baseCharacter);
      console.log("Rspta2:", response.data);
      assert.deepStrictEqual(response.data.success, true);
    }
  });
  it("POST request /addCharacter without movieIds Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
       //const characterValido = buildCharacterModel(baseCharacter)
      const response = await clienteRest.addCharacter( token,baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const response2 = await clienteRest.getCharacterWithId(token,response.data.character.id)
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });
  it.only("POST request /addCharacter WITH movie Success on (PROTECTED JWT ROUTE)", async () => {
    if (strategyAuth === "jwt") {
       //const characterValido = buildCharacterModel(baseCharacter)
      const movieModel = buildMovieModel(baseMovie)

      const response = await clienteRest.addCharacter( token,baseCharacter);
      console.log("Rspta111:", response.data);
      assert.deepStrictEqual(response.data.success, true);
      const response2 = await clienteRest.getCharacterWithId(token,response.data.character.id)
      console.log("Rspta2222:", response2.data);
      assert.deepStrictEqual(response2.data.success, true);
    }
  });

});

const validToken =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYWJkNWMzMy1mNjM1LTQwMTAtOTNkNy1hZGJjZDY4ZDdjYzQiLCJpYXQiOjE2NTg2OTYzMTA5NDUsImV4cCI6MTY1ODY5NjM5NzM0NX0.I43cjHUzSoJ-Y1k7lSueJjvo4-8waMg1UDYHFM2KL7G7owK2Lbs-leZgf08Dpe4242EIDOeRmBpUTJatMGdouzrZ8zYl4x-_wlxRfjDuYBRKJcQiRtQvdQ_RmaWiJ2GeGKySWiPCjqyBbSdrTF3kNjBX-yOxOOXelAbm8xKk8bnmvwrfGn6ycH7jAiFWudpSGqZm9h6i8HbV5WoSNFs13qKZCFZuMcmsftonpo3_B_BeC1vVggWcAwhmAZgRUKQnH0HhSYFv0wkhwcTMN869qgK0IO-c9BJt3uJdn_4ZZsJaHs9htkV5LEueHSBf_zsk1VIUY9-5ummr0sTR5ihT__FxikAwcNnu5NRndaPfMd1U5cCPJxSZqUZFhzot96Bwe4kfii-EfYMJhD2hLkj83vjspfANXv3gNNntVQsOhPjzUo8H4OabRiZPClBQIWi6SEAQhLlE1k3bhw4DvQ3MvQIjhZuTC2zuX2eXKT6az3sM6yosT-Z-RFqICXzaPAc_HVnWGPwf_0WR4zb5vjttFYNLiSNBNXp1Du8Ghnqi28AEEoMKdNpyjC9jCm61bpsQQz0e-Wg-gwXWNWrtJf6X9s1yTFJSBUb-WcI1fEAEyVGdMkip3sl5WEWQPiLN2n0o4EIJSBjNqaRLpPx4OBwyLku43N6w0aOHYKdRYjw41nk";
