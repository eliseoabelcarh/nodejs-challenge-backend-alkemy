const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * Schema required for Mongoose to save user in database
 * This is used only for Local Authentication Strategy
 * For JWT strategy I use other schemas/models for Sequelize and Postgres Database
 */

const userSchemaCollection = 'users'

const UserSchema = new Schema({
    id: String,
    username: String,
    password: String,
    salt:String,

})

const userSchemaModel = mongoose.model(userSchemaCollection, UserSchema)

module.exports = userSchemaModel