const strainerFactory = require("./strainerFactory")

/**
 * --------------------------------- STRAINER MODULE ENTRY POINT --------------------------------------- 
 * This module returns a STRAINER Object using a FACTORY PATTERN in STRAINERFactory file.
 * The STRAINER Object knows according his type FIND AND STRAIN OR FILTER many elements and handle them according request.
 * 
 */
const crearStrainer = () => {

    return {
        strainData: async ({ type, visibleFields, queries }) => {
            let strainer = strainerFactory.getInstance(type)
            return await strainer.getData({visibleFields, queries})
        }
    }
}


module.exports = { crearStrainer }