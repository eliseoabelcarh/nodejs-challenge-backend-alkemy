const axios = require('axios').default

//llamada a las APIs y rutas de proyecto
function crearclienteREST(port) {
    return {
        register: async (user) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/auth/register`, method: 'post', data: user, headers:{ Authorization: "Bearer YOUR_JWT_TOKEN_HERE"},withCredentials:true,})
        },
        login: async (user) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/auth/login`, method: 'post', data: user, headers:{ Authorization: "Bearer YOUR_JWT_TOKEN_HERE"},withCredentials:true,})
        },
        testProtectedRoute: async (bearerJwtToken) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/auth/protected`, method: 'post',  headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        testApiRoute: async () => {
            return await sendRequest({ url: crearURLBase(port) + `/test`, method: 'get' ,withCredentials:true,})
        },
        addCharacter: async (bearerJwtToken, character) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/characters`, method: 'post', data: character, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        getCharacterWithId: async (bearerJwtToken, characterId) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/characters/${characterId}`, method: 'get', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        addMovie: async (bearerJwtToken, movie) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movies`, method: 'post', data: movie, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        getMovieWithId: async (bearerJwtToken, movieId) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movies/${movieId}`, method: 'get', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        addMovieGenre: async (bearerJwtToken, movieGenre) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movieGenres`, method: 'post', data: movieGenre, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        getMovieGenreWithId: async (bearerJwtToken, movieGenreId) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movieGenres/${movieGenreId}`, method: 'get', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },  
        
       
       
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