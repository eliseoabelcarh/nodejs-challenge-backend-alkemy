
const path = require('path');
const { crearErrorArgumentosInvalidos } = require('../../errors/errorsHandler');

/**
 * 
 *------------------- ATTACHMENT FILE --------------------------
 * This is only for Nodemailer Option
 * @param {*} ruta Relative Path from file to attach in email 
 * @returns file - Prepared for email sender Service
 */
function generateFileObjectNodemailer(ruta) {
    let file = {}
    if (!ruta) {
        throw crearErrorArgumentosInvalidos('ruta', 'required field')
    } else {
        const name = path.basename(ruta)
        file.filename = name
        file.path = ruta
    }
    return file
}

module.exports = {
    generateFileObjectNodemailer
}