const { createUserModel } = require("../models/userModel");


const useCaseRegisterUser = (function () {

    let instance

    function create(storer) {

        return {
            // se utiliza para dar de alta un usuario nuevo
            register: async ({username,password}) => {
                const newUser = createUserModel({username,password})
                console.log("NEW USER es:", newUser)
                return await storer.storeData({type:"newUser", data:newUser})
               // const userModel = getUserModelFromRequest(req)
                //return await storer.storeData({ id: null, type: 'newUser', data: userModel })
            }
        }
    }

    return {
        getInstance: function (storer) {
            if (!instance) {
                instance = create(storer)
            }
            return instance
        }
    }
}
)()

module.exports = useCaseRegisterUser