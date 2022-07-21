const searcherFactory = require("./searcherFactory")


const crearSearcher = () => {

    return {
        searchData: async ({ type, field, value }) => {
            let searcher = searcherFactory.getInstance(type)
            return await searcher.searchByField({field, value})
        }
    }
}


module.exports = { crearSearcher }