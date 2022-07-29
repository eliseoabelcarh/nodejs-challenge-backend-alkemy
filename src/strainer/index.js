const strainerFactory = require("./strainerFactory")


const crearStrainer = () => {

    return {
        strainData: async ({ type, visibleFields, queries }) => {
            let strainer = strainerFactory.getInstance(type)
            return await strainer.getData({visibleFields, queries})
        }
    }
}


module.exports = { crearStrainer }