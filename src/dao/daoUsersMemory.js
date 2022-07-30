/**
 * This DAO is NOT COMPLETE yet,i used at start for making tests adding users,
 * you can add functions according interface in daoUsersSequelize file which already complete
 * acccording the requirements
 */
let daoUsersMemory = (function () {
    let instance
    function create(config) {

        const collection = []
        return {
            addUser: async (user) => {
                collection.push(user)
                return user
            },
            getUserById: async (id) => {
                let user = null
                collection.forEach(element => {
                    if (element.id === id) {
                        user = element
                    }
                });
                return user
            }
        }
    }

    return {
        getInstance: function (config) {
            if (!instance) {
                instance = create(config)
            }
            return instance
        }
    }

})()

module.exports = daoUsersMemory