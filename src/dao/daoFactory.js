const { configurations } = require("../configurations/configs");
const daoUsersMemory = require("./daoUsersMemory");
const daoUsersMongo = require("./daoUsersMongo");
const daoUsersSequelize = require("./daoUsersSequelize");
const daoElementsSequelize = require("./daoElementsSequelize");

/**
 * -------------------------------  Get DAO configurations --------------------------
 */
const typeDaoConfig = configurations.daoConfig();

let daoUsers;
let daoElements;
if (typeDaoConfig === "mongo") {
  daoUsers = daoUsersMongo;
}
if (typeDaoConfig === "sequelize") {
  daoUsers = daoUsersSequelize;
  daoElements = daoElementsSequelize;
} else {
  daoUsers = daoUsersMemory;
}
/**
 * ----------------------------------- DAO FACTORY -------------------------------- 
 * I use this pattern for creating DAO, is a creational pattern that uses 
 * factory methods to deal with the problem of creating objects in this case database access
 * also used in useCases Folder
 */
let daoFactory = {
  getDao: function (type) {
    if (type === "users") {
      return daoUsers.getInstance();
    }
    if (type === "elements") {
      return daoElements.getInstance();
    }
    throw new Error("tipo de DaoUsers no encontrado");
  }
}

module.exports = daoFactory;
