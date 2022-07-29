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
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/auth/test`, method: 'get' ,withCredentials:true,})
        },
        addCharacter: async (bearerJwtToken, character) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/characters`, method: 'post', data: character, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        getCharacterWithId: async (bearerJwtToken, characterId) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/characters/${characterId}`, method: 'get', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },




        getAllCharacters: async (bearerJwtToken) => {
            ///OPTION1: api/characters?1[name,contains,string]=foo&2[id,gte,number]=123
            ///OPTION2: api/characters?age[]=equal&age[]=25&name[]=jose
            /// VALID TO USE LATER ON FUTURE VERSIONS: api/characters?name=equal&name=abel&age=between&age=30&age=50
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/characters`, method: 'get', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        getAllMovies: async (bearerJwtToken) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movies`, method: 'get', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        getAllMovieGenres: async (bearerJwtToken) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movieGenres`, method: 'get', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
   

        

        updateCharacter: async (bearerJwtToken, characterId, changes) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/characters/${characterId}`, method: 'put',data:changes, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        updateMovie: async (bearerJwtToken, movieId, changes) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movies/${movieId}`, method: 'put',data:changes, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        updateMovieGenre: async (bearerJwtToken, movieGenreId, changes) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movieGenres/${movieGenreId}`, method: 'put',data:changes, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
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

        addMovieToCharacter: async (bearerJwtToken,characterId, movie) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/characters/${characterId}/movies`, method: 'post', data: movie, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        addCharacterToMovie: async (bearerJwtToken,movieId, character) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movies/${movieId}/characters `, method: 'post', data: character, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        addMovieToMovieGenre: async (bearerJwtToken,movieGenreId, movie) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movieGenres/${movieGenreId}/movies`, method: 'post', data: movie, headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        removeCharacterFromMovie: async (bearerJwtToken,parentID,elementToRemoveID) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movies/${parentID}/characters?characterId=${elementToRemoveID}`, method: 'delete', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        removeMovieFromCharacter: async (bearerJwtToken,parentID,elementToRemoveID) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/characters/${parentID}/movies?movieId=${elementToRemoveID}`, method: 'delete', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        removeMovieFromMovieGenre: async (bearerJwtToken,parentID,elementToRemoveID) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movieGenres/${parentID}/movies?movieId=${elementToRemoveID}`, method: 'delete', headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        deleteCharacter: async (bearerJwtToken,characterId) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/characters/${characterId}`, method: 'delete',headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        deleteMovie: async (bearerJwtToken,movieId) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movies/${movieId}`, method: 'delete',headers:{ Authorization: bearerJwtToken },withCredentials:true,})
        },
        deleteMovieGenre: async (bearerJwtToken,movieGenreId) => {
            return await sendRequest({ url: crearURLBaseWithoutAPI(port) + `/api/movieGenres/${movieGenreId}`, method: 'delete',headers:{ Authorization: bearerJwtToken },withCredentials:true,})
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