require('dotenv').config()


function getDaoConfig() {
    return {
        typeDaoConfig: process.env.DAO_TYPE || 'memory'
    }
}


module.exports = {
    getDaoConfig
}