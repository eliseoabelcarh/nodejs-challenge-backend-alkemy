const { crearErrorRecursoNoEncontrado, crearErrorDeBaseDeDatos, crearErrorArgumentosInvalidos } = require('../../src/errors/errorsHandler')
const { createUserModel } = require('../models/userModel')
//const mongoose = require('../auth/connection');
const userSchemaModel = require('./userSchema')


let daoUsersMongo = (function () {

    let instance

    function create(config) {

        return {
            addUser: async (user) => {
              // await conectar(config)
                console.log("en Adduser", user)
                //const usuarioCreado = createUserModel(datos)
                const userMongo = await userSchemaModel.findOne({ id: user.id }).exec();
                if (userMongo) {
                    throw crearErrorArgumentosInvalidos('id', 'usuario con id ya existe')
                }
                const userNew = new userSchemaModel(user)
                await userNew.save()
                console.log("en Adduser-user saved", user)
              // await desconectar()
                return user
            },
            getUserById: async (id) => {
              //  await conectar(config)
              console.log("en getuserbyID", id)
                const idBuscado = id.toString()
                const userMongo = await userSchemaModel.findOne({ id: idBuscado }).exec();
                if (!userMongo) {
                    throw crearErrorRecursoNoEncontrado('usuario', idBuscado)
                }
                const usuario = createUserModel(userMongo)
              //await desconectar()
                return usuario

            },
       
            cleanAll: async () => {
                await conectar(config)
                await userSchemaModel.deleteMany({});
                await desconectar()
            },
         

        }
    }

    return {
        getInstance: function (config) {
            if (!instance) {
                instance = create(config)
            }
            return instance
        }
    }

})()


async function conectar(config) {
    try {
     await mongoose.connection.getClient().connect()
        console.log('...connected')
    } catch (error) {
        throw crearErrorDeBaseDeDatos(error.message)
    }
}
async function desconectar() {
    console.log('.Mongo Desconectado')
    await mongoose.connection.getClient().close()
    //await mongoose.connection.close()
}


async function getUserById(id) {
    const idBuscado = Number.parseInt(id)
    const userMongo = await userSchemaModel.findOne({ id: idBuscado }).exec();
    if (!userMongo) {
        throw crearErrorRecursoNoEncontrado('usuario', idBuscado)
    }
    return crearUserModel(userMongo)
}

module.exports = daoUsersMongo