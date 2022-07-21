const axios = require('axios').default

//llamada a las APIs y rutas de proyecto
function crearclienteREST(port) {
    return {
        register: async (user) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/auth/register`, method: 'post', data: user, headers:{ Authorization: "Bearer YOUR_JWT_TOKEN_HERE"},withCredentials:true,})
        },
        testProfileRoute: async (cookie) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/auth/perfil`, method: 'get', headers:{ Authorization: "Bearer YOUR_JWT_TOKEN_HERE", Cookie: cookie},withCredentials:true,})
        },
        testApiRoute: async () => {
            return await sendRequest({ url: crearURLBase(port) + `/test`, method: 'get' ,withCredentials:true,})
        }
    }
}

//urlBase de API con prefijo /api
function crearURLBase(port) {
    return `http://localhost:${port}/api`
}
function crearURLBaseWithoutAPI(port) {
    return `http://localhost:${port}`
}
function crearURLNroWithoutAPI(port) {
    return `http://192.168.0.123:80`
}



// envío de request
// dependencia con axios
async function sendRequest(req) {
    try {
        const result = await axios(req)
        return result
    } catch (error) {
        console.log("ERRRRR:", error)
        if (error.response) {
            const NE = new Error(`error ${error.response.status} enviado desde el servidor: ${error.response.data.message}`)
            NE.status = error.response.status
            NE.message = error.response.data.message
            throw NE
        } else {
            throw new Error('error al enviar la peticion')
        }
    }
}

module.exports = { crearclienteREST}