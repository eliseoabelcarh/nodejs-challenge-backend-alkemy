const { createUserModel, passwordIsValid } = require("../models/userModel");

/**
 * --------------------------------- USE CASE TO LOGIN USER -----------------------------
 * This developed using Singleton Pattern and Dependency Injection. This object receives 
 * a Tasker object to be instantiate using a dependency injection. 
 * This object exists in case we need to add some business logic related to useCase.
 * You have to determines what business logic includes here or include in Tasker object.
 */

const useCaseLoginUser = (function () {

    let instance

    function create(finder) {

        return {
            // We find a user with the help of our Tasker(finder), which give us a user in DB
            // using only the username, then we have to check if it matches with password sent earlier.
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