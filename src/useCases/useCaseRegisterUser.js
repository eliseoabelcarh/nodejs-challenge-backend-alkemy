const { createUserModel } = require("../models/userModel");


const useCaseRegisterUser = (function () {

    let instance

    function create(storer) {

        return {
            // se utiliza para dar de alta un usuario nuevo
            register: async (req) => {
                const data = req.body;
                console.log("REQ.BODY es:", data)
                const newUser = createUserModel(data)
                console.log("NEW USER es:", newUser)
                return await storer.storeData({id:null, type:"newUser", data:newUser})
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