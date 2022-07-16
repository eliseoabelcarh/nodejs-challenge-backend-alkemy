const { createServer } = require("../../src/server/server");
const { assert, expect } = require("chai");
require("chai").use(require("chai-as-promised")).should();
require('dotenv').config()

describe("Server", async () => {
  const emptyObject = {};
  let server
  before(async () => {

  });

  it("No object argument to create server should throws error", () => {
    expect(function () {
      createServer();
    }).to.throws("Cannot read property 'port' of undefined");
  });
  it("Empty object argument to create server should resolve promise server", async () => {
    await createServer(emptyObject).should.eventually.be.fulfilled;
  });
  it("The server port address should be the same as what we passed", async () => {
    const example = 3005;
    server = await createServer({port: example})
    assert.deepStrictEqual(server.address().port, example)
  });

});
