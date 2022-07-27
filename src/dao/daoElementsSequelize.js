const {
    crearErrorRecursoNoEncontrado,
    crearErrorDeBaseDeDatos,
    crearErrorArgumentosInvalidos,
  } = require("../../src/errors/errorsHandler");
const { baseMovie } = require("../../test/models/examples");
  const connectSequelize = require("../database/connectionSequelize");
const { getSequelizeModels } = require("../database/sequelizeModels");
const { buildCharacterModel,recoverCharacterModel } = require("../models/characterModel");
const { buildMovieModel } = require("../models/movieModel");
  const { createUserModel, recoverUserModel } = require("../models/userModel");
const { characterMovieSequelizeModel } = require("./daoModels/characterMovieSequelize");
const { characterSequelizeModel } = require("./daoModels/characterSequelizeModel");
const { movieSequelizeModel } = require("./daoModels/movieSequelizeModel");
  const { userSequelizeModel } = require("./daoModels/userSequelizeModel");
  
  let daoElementsSequelize = (function () {
    let instance;
  
    function create() {
      
      return {
        addCharacter: async (character) => {
          console.log("-------------ENTRANTEEEEEEE:",character)
         
          const sequelize = await (await connectSequelize).getInstance()
          const {characterSeqModel,movieSeqModel,movieGenreModel,characterMovieSeqModel } = await getSequelizeModels(sequelize)
          

          console.log("-------------ENffffffffffE:",baseMovie)

          const movieModel = buildMovieModel(baseMovie)
          console.log("//////MOVIE MODEL PARA CREAR:",movieModel)
          const dbMovie = await movieSeqModel.create(movieModel);
          const dbCharacter = await characterSeqModel.create(character)
          
          const result = await characterMovieSeqModel.create({
            characterId:dbCharacter.id,
            movieId:dbMovie.id
          })
          const characterInDB = await characterSeqModel.findOne({ where: { id:dbCharacter.id },include:["peliculas"] });
          console.log("**********resullllCharcterrr", characterInDB)
          const movieInDB = await movieSeqModel.findOne({ where: { id:dbMovie.id },include:["personajes"] });
          console.log("**********resullllMovieeee", movieInDB)
          //dbCharacter.addMovies()
    
        //  characterSeqModel.addMovieSeqModels()



          console.log("-------------db:", dbCharacter)
          const newCharacter = recoverCharacterModel(dbCharacter)
          return newCharacter;
        },
        getCharacterById: async (id) => {
          console.log("hahahahaha")
          const sequelize = await (await connectSequelize).getInstance()
          const characterSeqModel = await characterSequelizeModel(sequelize)
          let characterInDB;
          console.log("haha---------------------------hahaha", id)
          characterInDB = await characterSeqModel.findOne({ where: { id } });
          console.log("CCAAAS",characterInDB)
          if (!characterInDB) {
            throw crearErrorRecursoNoEncontrado("character", idBuscado);
          }
          console.log("characterrr enDao:",characterInDB)
          const result = recoverCharacterModel(characterInDB);
          return result
        },
        getUserByUsername: async (username) => {
          const sequelize = await (await connectSequelize).getInstance()
          const userSeqModel = await userSequelizeModel(sequelize);
          let userInDB;
          userInDB = await userSeqModel.findOne({ where: { username } });
          if (!userInDB) {
              throw crearErrorRecursoNoEncontrado("usuario", username);
            }
            const usuario = recoverUserModel(userInDB);
            //await desconectar()
            return usuario;
        },
      };
    }
  
    return {
      getInstance: function () {
        if (!instance) {
          instance = create();
        }
        return instance;
      },
    };
  })();
  
  module.exports = daoElementsSequelize;
  