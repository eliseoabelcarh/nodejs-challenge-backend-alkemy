const { createServer } = require("../../src/server/server");
var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);
const assert = require("assert");
require("chai").use(require("chai-as-promised")).should();
require("dotenv").config();
const { crearclienteREST } = require("./clientREST");


const genRandValue = (len) => {
    return Math.random().toString(36).substring(2,len+2);
  }
  

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
        const user = { otherProperty: "other" };
        await clienteRest.register(user);
      },
      (err) => {
        assert.strictEqual(err.message,"bad credentials: no username or password");
        assert.strictEqual(err.status, 400);
        return true;
      }
    );
  });
  it("POST request without username or empty value throws error", async () => {
    await assert.rejects(
      async () => {
        const user = { password: "pass" }; //works with username:""
        await clienteRest.register(user);
      },
      (err) => {
        assert.strictEqual(err.message, "bad credentials: username missing");
        assert.strictEqual(err.status, 400);
        return true;
      }
    );
  });
  it("POST request without password throws error", async () => {
    await assert.rejects(
      async () => {
        const user = { username: "usernam" }; //works with password:""
        await clienteRest.register(user);
      },
      (err) => {
        assert.strictEqual(err.message, "bad credentials: password missing");
        assert.strictEqual(err.status, 400);
        return true;
      }
    );
  });
  it("POST request with username already exists throw error", async () => {
    await assert.rejects(
        async () => {
          const user = { username: "username" , password:"pass"};
          await clienteRest.register(user);
          await clienteRest.register(user);
        },
        (err) => {
          assert.strictEqual(err.message, "username: usuario con username ya existe");
          assert.strictEqual(err.status, 400);
          return true;
        }
      );
  });
  it("POST request with correct data", async () => {
    const randString = genRandValue(8)
    const user = { username: `username${randString}`, password: "daasf" };
    const response = await clienteRest.register(user);
    const cookie = response.headers["set-cookie"][0];
    console.log("Rspta POST register:", cookie);
    const response2 = await clienteRest.testProfileRoute(cookie);
    console.log("Rspta GET profile visits:", response2.data.visits);
    assert.strictEqual(response2.data.visits, 2);
    assert.strictEqual(response2.status, 200);
  });
});
