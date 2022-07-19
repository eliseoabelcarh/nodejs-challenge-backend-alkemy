const { getDaoConfig } = require("./daoConfig")
const daoUsersMemory = require("./daoUsersMemory")

const { typeDaoConfig } = getDaoConfig()

let daoUsers
if(typeDaoConfig === "memory"){
    console.log("typeDaoCinfig", typeDaoConfig)
    daoUsers = daoUsersMemory
}else{
    daoUsers = daoUsersMemory
}

let daoFactory = (function () {
    let daoInstance

    //función que devuelve base de datos para usuarios
    function create(type) {
        if(type === "users"){
            return daoUsers.getInstance()
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