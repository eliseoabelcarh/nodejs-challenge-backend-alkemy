const { assert, expect } = require("chai");
require("chai").use(require("chai-as-promised")).should();

const { baseUser } = require("./examples");
const { createUserModel } = require("../../src/models/userModel");

describe("User Model", () => {
  let userCreated;

  before(() => {
    userCreated = createUserModel(baseUser);
  });

  it("If no arguments provided throws error", () => {
    expect(() => {
      createUserModel();
    }).to.throws("empty data: no arguments provided");
  });
  it("Id must be created for new User and id doesnt be empty", () => {
    const haveId = userCreated.hasOwnProperty("id");
    assert.deepStrictEqual(haveId, true);
    const chars = userCreated.id.length > 0;
    assert.deepStrictEqual(chars, true);
  });
  it("If some missing arguments provided throws error", () => {
    const requeridos = ["username", "password"];
    requeridos.forEach((required) => {
      let example = { ...baseUser };
      delete example[required];
      expect(() => {
        createUserModel(example);
      }).to.throws(`${required}: required field`);
    });
  });
});
