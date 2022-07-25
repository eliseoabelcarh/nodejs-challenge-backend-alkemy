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

describe("Server APIs", async () => {
  const emptyObject = {};
  let server;
  let clienteRest;
  
  const strategyAuth = configurations.getStrategyAuth()

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
        assert.strictEqual(
          err.message,
          "bad credentials: no username or password"
        );
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
        const user = { username: "usernam@test.com" }; //works with password:""
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
        const user = { username: "username@test.com", password: "pass" };
        await clienteRest.register(user);
        await clienteRest.register(user);
      },
      (err) => {
        assert.strictEqual(
          err.message,
          "username: username alredy exists"
        );
        assert.strictEqual(err.status, 400);
        return true;
      }
    );
  });
  it("POST request REGISTER correctly", async () => {
    const randString = genRandValue(8);
    const user = { username: `username${randString}@test.com`, password: "daasf" };
    const response = await clienteRest.register(user);
    console.log("Rspta POST register:", response.data);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.success, true);
  });



  it("POST request LOGIN CORRECTLY", async () => {
    const randString = genRandValue(8);
    const user = { username: `username${randString}@test.com`, password: "daasf" };
    await clienteRest.register(user);
    const response = await clienteRest.login(user);
    console.log("Rspta POST login:", response.data);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.success, true);
  });

  //Only for JWT authentication
  it("POST request PROTECTED JWT ROUTE", async () => {
    if (strategyAuth === "jwt") {
      const randString = genRandValue(8);
      const user = { username: `username${randString}@test.com`, password: "daasf" };
      await clienteRest.register(user);
      const response = await clienteRest.login(user);
      const token = response.data.token;
      console.log("Rspta POST login:", response.data.token);
      const response2 = await clienteRest.testProtectedRoute(token);
      console.log("Rspta2:", response2.data);
      assert.deepStrictEqual(response2.data.success, true)
    }
  });
});


