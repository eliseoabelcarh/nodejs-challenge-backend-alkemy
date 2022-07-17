const { createServer } = require("../../src/server/server");
const { assert, expect } = require("chai");
const {
  crearErrorAlConectarAServidorExpress,
} = require("../../src/errors/errorsHandler");
require("chai").use(require("chai-as-promised")).should();
require("dotenv").config();

describe("Server", async () => {
  const emptyObject = {};
  let server;
 // before(async () => {});

  it("No object argument to create server should throws error", () => {
    expect(function () {
      createServer();
    }).to.throws("Cannot read property 'port' of undefined");
  });
  it("Empty object argument to create server should resolve promise server", async () => {
    //if the "PORT" variable exists in .env file, it will be use it
    //otherwise default value = 0 it will be use it
    await createServer(emptyObject).should.eventually.be.fulfilled;
  });
  it("The server port address should be the same as what we passed", async () => {
    const example = 3005;
    server = await createServer({ port: example });
    assert.deepStrictEqual(server.address().port, example);
  });
  it("Catch error message if server reject/fails/busy on connect Server", async () => {
    const example = 8888;
    await createServer({ port: example });
    const promise2 = createServer({ port: example });
    let errorReceived;
    await promise2.catch((error) => {
      errorReceived = error;
    });
    const errorExpected = crearErrorAlConectarAServidorExpress();
    assert.deepStrictEqual(errorReceived.message, errorExpected.message);
  });
});
