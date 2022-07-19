const storerFactory = require("./storerFactory")


const crearStorer = () => {

    return {

        storeData: async ({ id, type, data }) => {
            let storer = storerFactory.getInstance(type)
            return await storer.save(id, data)
        }
    }
}


module.exports = { crearStorer }