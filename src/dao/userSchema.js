const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchemaColection = 'users'

// schema modelo para base de datos de usuarios
const UserSchema = new Schema({
    id: String,
    username: String,
    password: String,
    salt:String,

})

const userSchemaModel = mongoose.model(userSchemaColection, UserSchema)

module.exports = userSchemaModel