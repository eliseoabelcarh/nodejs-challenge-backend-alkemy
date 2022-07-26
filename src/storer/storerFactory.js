const daoFactory = require("../dao/daoFactory")
const storerNewUser = require("./storerNewUser")
const storerNewCharacter = require("./storerNewCharacter")

const daoUsers = daoFactory.getDao("users")
//const daoElements = daoFactory.getDao("elements")

const storerFactory = {

    
    getInstance: function (type) {

        if (type === 'newUser') {
            console.log("daooooo new user")
            return storerNewUser.getInstance(daoUsers)
        }
        if (type === 'character') {
            const daoElements = daoFactory.getDao("elements")
            console.log("daooooo charatacterrrrrrrrrrrrrrrrrr", daoElements)
            return storerNewCharacter.getInstance(daoElements)
        }
  
 
    }
}


module.exports = storerFactory