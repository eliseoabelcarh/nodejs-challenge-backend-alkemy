const { createUserModel, passwordIsValid } = require("../models/userModel");


const useCaseLoginUser = (function () {

    let instance

    function create(searcher) {

        return {
            // se utiliza para dar de alta un usuario nuevo
            login: async ({username,password}) => {
                const userDB = await searcher.searchData({ type:"user", field:"username", value:username })
                if(passwordIsValid({plainTextPassword:password, hashedPassword:userDB.password, salt:userDB.salt})){
                    return userDB
                }
                return null
            }
        }
    }

    return {
        getInstance: function (searcher) {
            if (!instance) {
                instance = create(searcher)
            }
            return instance
        }
    }
}
)()

module.exports = useCaseLoginUser