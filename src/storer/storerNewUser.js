const { createUserModel } = require("../models/userModel")

const storerNewUser = (function () {

    let instance

    function create(dao) {


        return {
            save: async (data) => {
                console.log("EN storerNewUser:", data)
                //DAO alredy verify if username already exits
                // const newUser = createUserModel(data)
                // console.log("NEW USER es:", newUser)
                return await dao.addUser(data)
            }
        }

    }

    return {
        getInstance: function (dao) {
            if (!instance) {
                instance = create(dao)
            }
            return instance
        }
    }
}
)()

module.exports = storerNewUser