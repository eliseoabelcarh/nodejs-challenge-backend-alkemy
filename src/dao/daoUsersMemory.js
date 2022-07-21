
let daoUsersMemory = (function () {

    let instance

    function create(config) {

        const collection = []
        return {
            addUser: async (user) => {
                collection.push(user)
                console.log("MEMORY-COLLECTION:",collection)
                return user
            },
            getUserById: async(id) =>{
                let user = null
                collection.forEach(element => {
                    if(element.id === id){
                        user = element
                    }
                });
                console.log("USER ENCONTRADO:",user)
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