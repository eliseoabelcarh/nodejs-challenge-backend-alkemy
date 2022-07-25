const { configurations } = require("../configurations/configs")
const daoUsersMemory = require("./daoUsersMemory")
const daoUsersMongo = require("./daoUsersMongo")
const daoUsersSequelize = require("./daoUsersSequelize")
const daoElementsSequelize = require("./daoElementsSequelize")

const typeDaoConfig = configurations.daoConfig()

let daoUsers
let daoElements
if(typeDaoConfig === "mongo"){
    daoUsers = daoUsersMongo
}
if(typeDaoConfig === "sequelize"){
    daoUsers = daoUsersSequelize
    daoElements = daoElementsSequelize
}
else{
    daoUsers = daoUsersMemory
}

let daoFactory = (function () {
    let daoInstance
    //función que devuelve base de datos para usuarios
    function create(type) {
        if(type === "users"){
            return daoUsers.getInstance()
        }
        if(type === "elements"){
            return daoElements.getInstance()
        }
        throw new Error('tipo de DaoUsers no encontrado')
    }
    return {
        getDao: function (type) {
            if (!daoInstance) {
                daoInstance = create(type)
            }
            return daoInstance
        },
    }

})()

module.exports = daoFactory