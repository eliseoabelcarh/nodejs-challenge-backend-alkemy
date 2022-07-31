const finderFactory = require("./finderFactory")

/**
 * --------------------------------- FINDER MODULE ENTRY POINT --------------------------------------- 
 * This module returns a Finder Object using a FACTORY PATTERN in finderFactory file.
 * The Finder Object knows according his type find/search an element and handle it according request.
 * 
 */
const crearFinder = () => {

    return {
        findData: async ({ type, field, value }) => {
            let finder = finderFactory.getInstance(type)
            return await finder.searchByField({field, value})
        }
    }
}


module.exports = { crearFinder }