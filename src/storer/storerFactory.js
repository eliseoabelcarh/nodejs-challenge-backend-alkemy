const daoFactory = require("../dao/daoFactory")
const storerNewUser = require("./storerNewUser")


const daoUsers = daoFactory.getDao("users")

const storerFactory = {

    
    getInstance: function (type) {

        if (type === 'newUser') {
            return storerNewUser.getInstance(daoUsers)
        }
  
 
    }
}


module.exports = storerFactory