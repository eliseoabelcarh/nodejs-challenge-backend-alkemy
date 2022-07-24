const daoFactory = require("../dao/daoFactory")
const finderUser = require("./finderUser")


const daoUsers = daoFactory.getDao("users")

const finderFactory = {

    
    getInstance: function (type) {

        if (type === 'user') {
            return finderUser.getInstance(daoUsers)
        }
  
 
    }
}


module.exports = finderFactory