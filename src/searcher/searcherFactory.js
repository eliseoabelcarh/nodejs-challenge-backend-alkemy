const daoFactory = require("../dao/daoFactory")
const searcherUser = require("./searcherUser")


const daoUsers = daoFactory.getDao("users")

const searcherFactory = {

    
    getInstance: function (type) {

        if (type === 'user') {
            return searcherUser.getInstance(daoUsers)
        }
  
 
    }
}


module.exports = searcherFactory