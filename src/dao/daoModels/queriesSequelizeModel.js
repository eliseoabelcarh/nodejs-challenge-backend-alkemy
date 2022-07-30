const { crearErrorArgumentosInvalidos } = require("../../errors/errorsHandler");
const { getAValidCharacterFieldIfExists, isAssociationCharacterField, isAValidCharacterField } = require("../../models/characterModel");
const { isAssociationMovieField, isAValidMovieField, getAValidMovieFieldIfExists } = require("../../models/movieModel");

/**
 * ------------------------------------------ QUERIES MODELING ----------------------------------------
 * I will use this functions for handle input queries requests
 * Here I define what kind of queries are, according where is received I associated a
 * specific model 
 * I maintain errors handle code repeated on purpose, in case I need handle multiple queries later
 */

/**
 * ------------------------------- for character model -------------------------------------
 */
function modelWhereCharacterModel(queries) {
    console.log("queries en Model Where", queries)
    if (Object.keys(queries).length === 0) {
        return {}
    }
    const keys = Object.keys(queries);
    if (keys.length > 1) {
        throw crearErrorArgumentosInvalidos("queries", "too much fields sended")
    }
    const field = keys[0]
    const value = queries[keys[0]]
    if (isAssociationCharacterField(field)) {
        return {}
    }
    if (isOrderQuery(field)) {
        return {}
    }
    if (Array.isArray(value)) {
        throw crearErrorArgumentosInvalidos("queries", "too much values sended")
    }
    if (isAValidCharacterField(field)) {
        const characterField = getAValidCharacterFieldIfExists(field)
        const whereModel = {}
        whereModel[characterField] = value
        return whereModel
    }
    else {
        throw crearErrorArgumentosInvalidos("modelWhereCharacter", "unknowed field sent")
    }
}

function modelWhereAssociatedCharacterModel(queries) {
    if (Object.keys(queries).length === 0) {
        return {}
    }
    const keys = Object.keys(queries);
    if (keys.length > 1) {
        throw crearErrorArgumentosInvalidos("queries", "too much fields sended")
    }
    const field = keys[0]
    const value = queries[field]
    if (Array.isArray(value)) {
        throw crearErrorArgumentosInvalidos("queries", "too much values sended")
    }
    if (!isAssociationCharacterField(field)) {
        return {}
    }
    const whereModel = {}
    whereModel[field] = value
    return whereModel
}
/**
 * ------------------------------- for movie model -------------------------------------
 */
function modelWhereMovieModel(queries) {
    console.log("queries en Model Where", queries)
    if (Object.keys(queries).length === 0) {
        return {}
    }
    const keys = Object.keys(queries);
    if (keys.length > 1) {
        throw crearErrorArgumentosInvalidos("queriesMovies", "too much fields sended")
    }
    const field = keys[0]
    const value = queries[keys[0]]
    if (isAssociationMovieField(field)) {
        return {}
    }
    if (isOrderQuery(field)) {
        return {}
    }
    if (Array.isArray(value)) {
        throw crearErrorArgumentosInvalidos("queries", "too much values sended")
    }
    if (isAValidMovieField(field)) {
        const movieField = getAValidMovieFieldIfExists(field)
        const whereModel = {}
        whereModel[movieField] = value
        return whereModel
    }
    else {
        throw crearErrorArgumentosInvalidos("modelWhereMovie", "unknowed field sent")
    }
}

function modelWhereAssociatedMovieModel(queries) {
    if (Object.keys(queries).length === 0) {
        return {}
    }
    const keys = Object.keys(queries);
    if (keys.length > 1) {
        throw crearErrorArgumentosInvalidos("queriesMovie", "too much fields sended")
    }
    const field = keys[0]
    const value = queries[field]

    if (Array.isArray(value)) {
        throw crearErrorArgumentosInvalidos("queries", "too much values sended")
    }
    if (!isAssociationMovieField(field)) {
        return {}
    }
    const whereModel = {}
    whereModel[field] = value
    return whereModel
}

/**
 * ------------------------------- SHARED MODELS FUNCTIONS -------------------------------------
 */
function getModelOrderQuery(queries) {
    const defaultOrder = ["createdAt", "ASC"]
    if (Object.keys(queries).length === 0) {
        return defaultOrder
    }
    const keys = Object.keys(queries);
    if (keys.length > 1) {
        throw crearErrorArgumentosInvalidos("queries", "too much fields sended")
    }
    const field = keys[0]
    const value = queries[field]
    if (!isOrderQuery(field)) {
        return defaultOrder
    }
    if (isAValidOrderQueryValue(value)) {
        return ["createdAt", value]
    }
    return defaultOrder
}

function isAValidOrderQueryValue(value) {
    return value === "ASC" || value === "DESC"
}

function isOrderQuery(field) {
    return field === "order"
}


module.exports = {
    modelWhereCharacterModel,
    modelWhereAssociatedCharacterModel,
    getModelOrderQuery,
    isOrderQuery,
    modelWhereMovieModel,
    modelWhereAssociatedMovieModel,

}


