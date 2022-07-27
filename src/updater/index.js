const updaterFactory = require("./updaterFactory")


const crearUpdater = () => {

    return {
        updateData: async ({ type, id, action, field, value }) => {
            let updater = updaterFactory.getInstance(type)
            return await updater.updateElement({id, action, field, value})
        }
    }
}


module.exports = { crearUpdater }