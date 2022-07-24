const finderFactory = require("./finderFactory")


const crearFinder = () => {

    return {
        findData: async ({ type, field, value }) => {
            let finder = finderFactory.getInstance(type)
            return await finder.searchByField({field, value})
        }
    }
}


module.exports = { crearFinder }