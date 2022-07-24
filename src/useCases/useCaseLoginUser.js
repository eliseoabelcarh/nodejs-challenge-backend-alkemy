const { createUserModel, passwordIsValid } = require("../models/userModel");


const useCaseLoginUser = (function () {

    let instance

    function create(finder) {

        return {
            // se utiliza para dar de alta un usuario nuevo
            login: async ({username,password}) => {
                const userDB = await finder.findData({ type:"user", field:"username", value:username })
                if(passwordIsValid({plainTextPassword:password, hashedPassword:userDB.password, salt:userDB.salt})){
                    return userDB
                }
                return null
            }
        }
    }

    return {
        getInstance: function (finder) {
            if (!instance) {
                instance = create(finder)
            }
            return instance
        }
    }
}
)()

module.exports = useCaseLoginUser