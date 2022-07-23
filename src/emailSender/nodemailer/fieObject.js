
const path = require('path');
const { crearErrorArgumentosInvalidos } = require('../../errors/errorsHandler');


function generateFileObjectNodemailer(ruta) {
    let file = {}
    if (!ruta) {
        throw crearErrorArgumentosInvalidos('ruta', 'campo requerido')
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