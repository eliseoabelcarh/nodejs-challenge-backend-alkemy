
const storerNewUser = (function () {

    let instance

    function create(dao) {


        return {
            save: async (data) => {
                console.log("EN storerNewUser:", data)
                //DAO verify if username already exits
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