const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchemaCollection = 'users'

// schema modelo para base de datos de usuarios
const UserSchema = new Schema({
    id: String,
    username: String,
    password: String,
    salt:String,

})

const userSchemaModel = mongoose.model(userSchemaCollection, UserSchema)

module.exports = userSchemaModel