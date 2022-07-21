const { getDaoConfig } = require("./daoConfig")
const daoUsersMemory = require("./daoUsersMemory")
const daoUsersMongo = require("./daoUsersMongo")



const { typeDaoConfig } = getDaoConfig()

let daoUsers
if(typeDaoConfig === "mongo"){
    console.log("typeDaoCinfig", typeDaoConfig)
    daoUsers = daoUsersMongo
}
else{
    daoUsers = daoUsersMemory
}

let daoFactory = (function () {
    let daoInstance

    //función que devuelve base de datos para usuarios
    function create(type) {
        if(type === "users"){
            return daoUsers.getInstance({cnxString: process.env.CNX_STRING_MONGO})
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