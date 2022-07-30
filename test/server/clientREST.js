
/**
 * ---------------------------------- AXIOS DEPENDENCY MODULE -------------------------------------
 * Axios is a promised-based HTTP client for JavaScript
 */
const axios = require('axios').default

/**
 * ---------------------------------------- CLIENT FOR MAKE REQUEST CALLS TO SERVER -----------------------------------
 * Only for Testing use cases in Test Folder
 * @param {*} port By default is considering port = 0 
 * @returns Client object for make request calls to server
 */
function crearclienteREST(port) {
    return {
        /**
         * ---------------------------------- CLIENT OPERATIONS FOR AUTHENTICATION -----------------------------------------
         */
        register: async (user) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/auth/register`, method: 'post', data: user, headers: { Authorization: "Bearer YOUR_JWT_TOKEN_HERE" }, withCredentials: true, })
        },
        login: async (user) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/auth/login`, method: 'post', data: user, headers: { Authorization: "Bearer YOUR_JWT_TOKEN_HERE" }, withCredentials: true, })
        },
        /**
         * ---------------------------------- CLIENT OPERATIONS FOR CHARACTERS -------------------------------------------
         */
        addCharacter: async (bearerJwtToken, character) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/characters`, method: 'post', data: character, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        addMovieToCharacter: async (bearerJwtToken, characterId, movie) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/characters/${characterId}/movies`, method: 'post', data: movie, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        addMovieToCharacterWithIds: async (bearerJwtToken, characterId, movieId) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/characters/${characterId}/movies`, method: 'post', data: { movieId }, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        getCharacterWithId: async (bearerJwtToken, characterId) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/characters/${characterId}`, method: 'get', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        getAllCharacters: async (bearerJwtToken) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/characters`, method: 'get', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        getCharactersMatchWith: async (bearerJwtToken, field, value) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/characters?${field}=${value}`, method: 'get', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        updateCharacter: async (bearerJwtToken, characterId, changes) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/characters/${characterId}`, method: 'put', data: changes, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        removeMovieFromCharacter: async (bearerJwtToken, parentID, elementToRemoveID) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/characters/${parentID}/movies?movieId=${elementToRemoveID}`, method: 'delete', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        deleteCharacter: async (bearerJwtToken, characterId) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/characters/${characterId}`, method: 'delete', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        /**
         * ---------------------------------- CLIENT OPERATIONS FOR MOVIES -----------------------------------------
         */
        addMovie: async (bearerJwtToken, movie) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movies`, method: 'post', data: movie, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        addCharacterToMovieWithIds: async (bearerJwtToken, movieId, characterId) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movies/${movieId}/characters`, method: 'post', data: { characterId }, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        addCharacterToMovie: async (bearerJwtToken, movieId, character) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movies/${movieId}/characters `, method: 'post', data: character, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        getMoviesMatchWith: async (bearerJwtToken, field, value) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movies?${field}=${value}`, method: 'get', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        getAllMovies: async (bearerJwtToken) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movies`, method: 'get', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        getMovieWithId: async (bearerJwtToken, movieId) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movies/${movieId}`, method: 'get', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        updateMovie: async (bearerJwtToken, movieId, changes) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movies/${movieId}`, method: 'put', data: changes, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        removeCharacterFromMovie: async (bearerJwtToken, parentID, elementToRemoveID) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movies/${parentID}/characters?characterId=${elementToRemoveID}`, method: 'delete', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        deleteMovie: async (bearerJwtToken, movieId) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movies/${movieId}`, method: 'delete', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        /**
         * -------------------------------- CLIENT OPERATIONS FOR MOVIE GENRES -----------------------------------------
         */
        addMovieGenre: async (bearerJwtToken, movieGenre) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movieGenres`, method: 'post', data: movieGenre, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        addMovieToMovieGenreWithIds: async (bearerJwtToken, movieGenreId, movieId) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movieGenres/${movieGenreId}/movies`, method: 'post', data: { movieId }, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        addMovieToMovieGenre: async (bearerJwtToken, movieGenreId, movie) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movieGenres/${movieGenreId}/movies`, method: 'post', data: movie, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        getAllMovieGenres: async (bearerJwtToken) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movieGenres`, method: 'get', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        getMovieGenreWithId: async (bearerJwtToken, movieGenreId) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movieGenres/${movieGenreId}`, method: 'get', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        updateMovieGenre: async (bearerJwtToken, movieGenreId, changes) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movieGenres/${movieGenreId}`, method: 'put', data: changes, headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        removeMovieFromMovieGenre: async (bearerJwtToken, parentID, elementToRemoveID) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movieGenres/${parentID}/movies?movieId=${elementToRemoveID}`, method: 'delete', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        deleteMovieGenre: async (bearerJwtToken, movieGenreId) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/movieGenres/${movieGenreId}`, method: 'delete', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        /**
         * ---------------------------------- ONLY FOR TEST PURPOSES -----------------------------------------
         */
        testProtectedRoute: async (bearerJwtToken) => {
            return await sendRequest({ url: crearURLBase(port) + `/api/auth/protected`, method: 'post', headers: { Authorization: bearerJwtToken }, withCredentials: true, })
        },
        testApiRoute: async () => {
            return await sendRequest({ url: crearURLBase(port) + `/api/auth/test`, method: 'get', withCredentials: true, })
        },

    }
}

// I create a BaseURL for test purposes
function crearURLBase(port) {
    return `http://localhost:${port}`
}

/**
 *--------------------------------- ERRORS CAPTURE ON SERVER RESPONSES ---------------------------
 * I make REQUESTS with Axios module
 * Axios Dependency: I customize response errors for handle in tests
 */

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

module.exports = { crearclienteREST }