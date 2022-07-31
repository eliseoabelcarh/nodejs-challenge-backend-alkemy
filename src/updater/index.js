const updaterFactory = require("./updaterFactory")

/**
 * --------------------------------- UPDATER MODULE ENTRY POINT --------------------------------------- 
 * This module returns a UPDATER Object using a FACTORY PATTERN in UPDATERFactory file.
 * The UPDATER Object knows according his type UPDATE an element and handle it according request.
 * 
 */
const crearUpdater = () => {

    return {
        updateData: async ({ type, id, action, field, value }) => {
            let updater = updaterFactory.getInstance(type)
            return await updater.updateElement({id, action, field, value})
        }
    }
}


module.exports = { crearUpdater }