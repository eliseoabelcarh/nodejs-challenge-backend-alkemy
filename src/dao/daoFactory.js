const { configurations } = require("../configurations/configs");
const daoUsersMemory = require("./daoUsersMemory");
const daoUsersMongo = require("./daoUsersMongo");
const daoUsersSequelize = require("./daoUsersSequelize");
const daoElementsSequelize = require("./daoElementsSequelize");

const typeDaoConfig = configurations.daoConfig();

let daoUsers;
let daoElements;
if (typeDaoConfig === "mongo") {
  daoUsers = daoUsersMongo;
}
if (typeDaoConfig === "sequelize") {
  daoUsers = daoUsersSequelize;
  daoElements = daoElementsSequelize;
  console.log("daolelelelelel", daoElements)
} else {
  daoUsers = daoUsersMemory;
}

// let daoFactory = (function () {
//   let daoInstance;
//   //función que devuelve base de datos para usuarios
//   function create(type) {
//     if (type === "users") {
//         console.log("tipooooooode DAOOOO", type)
//       return daoUsers.getInstance();
//     }
//     if (type === "elements") {
//         console.log("tipooooooode DAOOOO", type)
//       return daoElements.getInstance();
//     }
//     throw new Error("tipo de DaoUsers no encontrado");
//   }
//   return {
//     getDao: function (type) {
//       if (!daoInstance) {
//         daoInstance = create(type);
//       }
//       return daoInstance;
//     },
//   };
// })();




let daoFactory = {
    getDao: function(type){
        if (type === "users") {
            console.log("tipooooooode DAOOOO", type)
          return daoUsers.getInstance();
        }
        if (type === "elements") {
            console.log("tipooooooode DAOOOO", type)
          return daoElements.getInstance();
        }
        throw new Error("tipo de DaoUsers no encontrado");
    }
}

module.exports = daoFactory;
