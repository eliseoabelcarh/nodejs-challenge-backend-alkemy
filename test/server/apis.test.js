const { createServer } = require("../../src/server/server");
var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);
const assert = require("assert");
require("chai").use(require("chai-as-promised")).should();
require("dotenv").config();
const { crearclienteREST } = require("./clientREST");

describe("Server APIs", async () => {
  const emptyObject = {};
  let server;
  let clienteRest;

  beforeEach(async () => {
    server = await createServer(emptyObject);
    port = server.address().port;
    clienteRest = crearclienteREST(port);
    // dao = await daoFactory.getDao()
    // await dao.cleanAll()
  });
  afterEach(async () => {
    await server.close();
  });

  it("Testing ApiTest Route", async () => {
    const response = await clienteRest.testApiRoute();
    assert.deepStrictEqual(200, response.status);
    assert.deepStrictEqual("okay", response.data);
  });

  xit("POST request without username or password throws error", async () => {
    await assert.rejects(
      async () => {
        const user = {};
        await clienteRest.register(user);
      },
      (err) => {
        assert.strictEqual(err.message, "empty data: no arguments provided");
        assert.strictEqual(err.status, 400);
        return true;
      }
    );
  });
  xit("POST request without username or empty value throws error", async () => {
    await assert.rejects(
      async () => {
        const user = { password: "pass" }; //works with username:""
        await clienteRest.register(user);
      },
      (err) => {
        assert.strictEqual(err.message, "username: required field");
        assert.strictEqual(err.status, 400);
        return true;
      }
    );
  });
  xit("POST request without password throws error", async () => {
    await assert.rejects(
      async () => {
        const user = { username: "usernam" }; //works with password:""
        await clienteRest.register(user);
      },
      (err) => {
        assert.strictEqual(err.message, "password: required field");
        assert.strictEqual(err.status, 400);
        return true;
      }
    );
  });
  it("POST request with correct data", async () => {
    const user = { username: "usernam", password: "daasf" };
    const response = await clienteRest.register(user);
    const cookie = response.headers["set-cookie"][0]
    console.log("Rspta POST register:", cookie);
    const response2 = await clienteRest.testProfileRoute(cookie);
    console.log("Rspta GET profile:", response2.data);
  });
 
});
