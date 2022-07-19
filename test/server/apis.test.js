const { createServer } = require("../../src/server/server");
const { expect } = require("chai");
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

  it("POST request without username or password throws error", async () => {
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
  it("POST request without username or empty value throws error", async () => {
    await assert.rejects(
      async () => {
        const user = { password:"pass"};//works with username:""
        await clienteRest.register(user);
      },
      (err) => {
        assert.strictEqual(err.message, "username: required field");
        assert.strictEqual(err.status, 400);
        return true;
      }
    );
  });
  it("POST request without password throws error", async () => {
    await assert.rejects(
      async () => {
        const user = {username:"usernam"};//works with password:""
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
    const user = {username:"usernam", password:"daasf"};
    const response = await clienteRest.register(user);
    console.log("ID de nuevo Usuario:", response.data.id)
  });
});
