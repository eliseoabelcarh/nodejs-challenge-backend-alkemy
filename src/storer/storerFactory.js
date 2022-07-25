const daoFactory = require("../dao/daoFactory")
const storerNewUser = require("./storerNewUser")
const storerNewCharacter = require("./storerNewCharacter")

const daoUsers = daoFactory.getDao("users")
const daoElements = daoFactory.getDao("elements")

const storerFactory = {

    
    getInstance: function (type) {

        if (type === 'newUser') {
            return storerNewUser.getInstance(daoUsers)
        }
        if (type === 'character') {
            return storerNewCharacter.getInstance(daoElements)
        }
  
 
    }
}


module.exports = storerFactory