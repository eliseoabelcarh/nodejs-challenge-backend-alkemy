const storerFactory = require("./storerFactory")


const crearStorer = () => {

    return {

        storeData: async ({ type, data }) => {
            let storer = storerFactory.getInstance(type)
            return await storer.save(data)
        }
    }
}


module.exports = { crearStorer }