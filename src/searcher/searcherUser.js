
const searcherUser = (function () {

    let instance

    function create(dao) {


        return {
            searchByField: async ({field, value}) => {
                if(field === "id"){
                    return await dao.getUserById(value)
                }
                
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

module.exports = searcherUser