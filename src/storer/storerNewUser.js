
const storerNewUser = (function () {

    let instance

    function create(dao) {


        return {
            save: async (id, data) => {
                //id llega null
                console.log("EN storerNewUser:", data)
                //TODO chekar si existe antes no guardar otravez
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