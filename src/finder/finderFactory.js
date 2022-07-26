const daoFactory = require("../dao/daoFactory");
const finderCharacter = require("./finderCharacter");
const finderUser = require("./finderUser");

const daoUsers = daoFactory.getDao("users");
const daoElements = daoFactory.getDao("elements")

const finderFactory = {
  getInstance: function (type) {
    if (type === "user") {
      return finderUser.getInstance(daoUsers);
    }
    if (type === "character") {
        return finderCharacter.getInstance(daoElements);
      }
  },
};

module.exports = finderFactory;
