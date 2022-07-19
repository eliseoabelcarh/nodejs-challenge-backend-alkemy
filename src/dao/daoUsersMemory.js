
let daoUsersMemory = (function () {

    let instance

    function create(config) {

        const collection = []
        return {
            addUser: async (data) => {
                collection.push(data)
                console.log("MEMORY-COLLECTION:",collection)
                return data.id
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