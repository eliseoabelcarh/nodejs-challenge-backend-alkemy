
/**
* @typedef STATUS RESPONSES: /api/verificarDni/:id
* @description Respuestas de Servidor
* @property {'400'} STATUS INVALID_ARGS - Error en cliente
* @property {'401'} STATUS UNAUTHORIZED_RESOURCE - Recurso no autorizado
* @property {'404'} STATUS NOT_FOUND - Recurso no encontrado
* @property {'500'} STATUS INTERNAL_ERROR - Error en Servidor
* @property {'520'} STATUS undefined Otro error
*/


function serverErrorHandler(error, req, res, next) {
    console.log("en Servererrorhandler")
    if (error.type === 'INVALID_ARGS') {
        res.status(400)
    } else if (error.type === 'NOT_FOUND') {
        res.status(404)
    } else if (error.type === 'INTERNAL_ERROR') {
        res.status(500)
    } 
    else if (error.type === 'UNAUTHORIZED_RESOURCE') {
        res.status(401)
    }     
    else {
        res.status(520)
    }
    res.json({ message: error.message })
}


module.exports = { serverErrorHandler }