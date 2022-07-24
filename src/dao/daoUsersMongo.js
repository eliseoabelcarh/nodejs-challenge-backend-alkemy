const { crearErrorRecursoNoEncontrado, crearErrorDeBaseDeDatos, crearErrorArgumentosInvalidos } = require('../../src/errors/errorsHandler')
const { createUserModel, recoverUserModel } = require('../models/userModel')
const userSchemaModel = require('./userSchema')


let daoUsersMongo = (function () {

    let instance

    function create(config) {

        return {
            addUser: async (user) => {
              // await conectar(config)
                console.log("en Adduser", user)
                //const usuarioCreado = createUserModel(datos)
                var userMongo = await userSchemaModel.findOne({ id: user.id }).exec();
                if (userMongo) {
                    throw crearErrorArgumentosInvalidos('id', 'usuario con id ya existe')
                }
                userMongo = await userSchemaModel.findOne({ username: user.username }).exec();
                if (userMongo) {
                    throw crearErrorArgumentosInvalidos('username', 'usuario con username ya existe')
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
            getUserByUsername: async (username) => {
                //  await conectar(config)
                console.log("en getUserByUsername", username)
                  const userMongo = await userSchemaModel.findOne({username }).exec();
                  if (!userMongo) {
                      throw crearErrorRecursoNoEncontrado('usuario', username)
                  }
                  const usuario = recoverUserModel(userMongo)
                //await desconectar()
                  return usuario
  
              },
            
       
            // cleanAll: async () => {
            //     await conectar(config)
            //     await userSchemaModel.deleteMany({});
            //     await desconectar()
            // },
         

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


// async function conectar(config) {
//     try {
//      await mongoose.connection.getClient().connect()
//         console.log('...connected')
//     } catch (error) {
//         throw crearErrorDeBaseDeDatos(error.message)
//     }
// }
// async function desconectar() {
//     console.log('.Mongo Desconectado')
//     await mongoose.connection.getClient().close()
// }


module.exports = daoUsersMongo