const { createServer } = require("../../src/server/server");
const { assert, expect } = require("chai");
const {
  crearErrorAlConectarAServidorExpress,
} = require("../../src/errors/errorsHandler");
require("dotenv").config();

describe("Create Server Function", async () => {
  it("If No object argument provide to create server should throws error", async () => {
    try {
      await createServer();
    } catch (err) {
      expect(err.message).to.equal("Cannot read properties of undefined (reading 'port')");
    }
  });
});

describe("Create Server", async () => {
  const emptyObject = {};
  let server;
  let port;

  afterEach(async () => {
    port = server.address().port;
    await server.close();
    console.log("server Closed on port", port);
  });

  it("Empty object argument to create server should resolve promise server", async () => {
    //if the "PORT" variable exists in .env file, it will be use it
    //otherwise default value = 0 it will be use it
    server = await createServer(emptyObject);
    assert.deepStrictEqual(server.address().port !== undefined, true);
  });

  it("The server port address should be the same as what we passed", async () => {
    const example = 3005;
    server = await createServer({ port: example });
    assert.deepStrictEqual(server.address().port, example);
  });
  it("Catch error message if server reject/fails/busy on connect Server", async () => {
    const example = 8888;
    server = await createServer({ port: example });
    const promise2 = createServer({ port: example });
    let errorReceived;
    await promise2.catch((error) => {
      errorReceived = error;
    });
    const errorExpected = crearErrorAlConectarAServidorExpress();
    assert.deepStrictEqual(errorReceived.message, errorExpected.message);
  });
});
