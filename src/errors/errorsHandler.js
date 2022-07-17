function crearErrorAlConectarAServidorExpress(){
    const errMsg = 'error al conectar al servidor con Express'
    const err = new Error(errMsg)
    err.type = 'INTERNAL_ERROR'
    return err
}
function crearErrorArgumentosInvalidos(campo, regla) {
    const errMsg = `${campo}: ${regla}`
    const error = new Error(errMsg)
    error.type = 'INVALID_ARGS'
    return error
}


module.exports = {
    crearErrorAlConectarAServidorExpress,
    crearErrorArgumentosInvalidos

}