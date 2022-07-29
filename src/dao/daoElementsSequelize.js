const {
  crearErrorRecursoNoEncontrado,
  crearErrorDeBaseDeDatos,
  crearErrorArgumentosInvalidos,
} = require("../../src/errors/errorsHandler");
const { baseMovie, baseGenero } = require("../../test/models/examples");
const connectSequelize = require("../database/connectionSequelize");
const { getSequelizeModels } = require("../database/sequelizeModels");
const {
  buildCharacterModel,
  recoverCharacterModel,
  recoverCharactersList,
} = require("../models/characterModel");
const { buildMovieGenreModel, recoverMovieGenreModel, recoverMovieGenreList } = require("../models/movieGenreModel");
const { buildMovieModel, recoverMovieModel, recoverMoviesList } = require("../models/movieModel");
const { createUserModel, recoverUserModel } = require("../models/userModel");
const {
  characterMovieSequelizeModel,
} = require("./daoModels/characterMovieSequelize");
const {
  characterSequelizeModel,
} = require("./daoModels/characterSequelizeModel");
const { movieSequelizeModel } = require("./daoModels/movieSequelizeModel");
const { userSequelizeModel } = require("./daoModels/userSequelizeModel");

const Sequelize = require("sequelize")

let daoElementsSequelize = (function () {
  let instance;

  function create() {
    return {
      getCharacterList: async ({visibleFields, queries}) => {
        const { characterSeqModel } = await getSequelizeModels();
        const { movieSeqModel } = await getSequelizeModels();
        const elements = await characterSeqModel.findAll({ 
          include:  [{
            model: movieSeqModel,
            as:"peliculas",
            attributes: ["id","imagen","titulo"],
            through: {//referes to table MovieCharacters
              attributes: []
            }
          }]
      });
        console.log("----ss-s-s-s-s-ss--------",elements[0])
        const result = recoverCharactersList(elements)
        return result
      },
      getMovieList: async ({visibleFields, queries}) => {
        const { characterSeqModel } = await getSequelizeModels();
        const { movieSeqModel } = await getSequelizeModels();
        const elements = await movieSeqModel.findAll({ 
          include:  [{
            model: characterSeqModel,
            as:"personajes",
            attributes: ["id","imagen","nombre"],
            through: {//referes to table MovieCharacters
              attributes: []
            }
          }]
      });
        console.log("----zzzzzzzzzss--------",elements[0])
        const result = recoverMoviesList(elements)
        return result
      },
      getMovieGenreList: async ({visibleFields, queries}) => {
        console.log("----zcHEEEEEEEEEEEEEEEEEEEEEEEEEEE***********************************************")
        const { movieGenreSeqModel } = await getSequelizeModels();
        const { movieSeqModel } = await getSequelizeModels();
        const elements = await movieGenreSeqModel.findAll({ 
          include:  [{
            model: movieSeqModel,
            as:"peliculas",
            attributes: ["id","imagen","titulo","fechaCreacion"],
          }]
      });
        console.log("----zcgtgttgttttttttzzzzzss--------",elements[0])
        
        const result = recoverMovieGenreList(elements)
        return result
      },
      updateMovieGenre: async ({id, value}) => {
        const { movieGenreSeqModel } = await getSequelizeModels();
        const movieGenreInDB = await movieGenreSeqModel.findOne({ where: { id } });
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        await movieGenreInDB.update(value)//returns object without movieGenres
        const movieGenreUpdated = await movieGenreSeqModel.findOne({ where: { id: movieGenreInDB.id }, include: ["peliculas"] });
        const result = recoverMovieGenreModel(movieGenreUpdated)
        return result;
      },
      updateMovie: async ({id, value}) => {
        const { movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        await movieInDB.update(value)//returns object without movies
        const movieUpdated = await movieSeqModel.findOne({ where: { id: movieInDB.id }, include: ["personajes"] });
        const result = recoverMovieModel(movieUpdated)
        return result;
      },
      updateCharacter: async ({id, value}) => {
        const { characterSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({ where: { id } });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        await characterInDB.update(value)//returns object without movies
        const characterUpdated = await characterSeqModel.findOne({ where: { id: characterInDB.id }, include: ["peliculas"] });
        const result = recoverCharacterModel(characterUpdated)
        return result;
      },
      removeCharacter: async (id) => {
        console.log("-------------ENTR-****EEE:", id);
        const { characterSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({ where: { id } });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const result = await characterInDB.destroy()
        return result;
      },
      removeMovie: async (id) => {
        console.log("-------------ENTR-****EEE:", id);
        const { movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        const result = await movieInDB.destroy()//returns empty array
        return result;
      },
      removeMovieGenre: async (id) => {
        console.log("-------------ENTR-****EEE:", id);
        const { movieGenreSeqModel } = await getSequelizeModels();
        const movieGenreInDB = await movieGenreSeqModel.findOne({ where: { id } });
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        const result = await movieGenreInDB.destroy()//returns empty array
        return result;
      },
      addMovie: async (movie) => {
        console.log("-------------ENTRANTEEEEEEE:", movie);
        const { movieSeqModel } = await getSequelizeModels();
        const dbMovie = await movieSeqModel.create(movie);
        /**
         * ------- WE CONVERT ELEMENT DB TO OUR CUSTOM MODEL -------------------
         */
        const result = recoverMovieModel(dbMovie);
        return result;
      },
      addMovieToMovieGenre: async ({ id, value }) => {
        const { movieSeqModel, movieGenreSeqModel } = await getSequelizeModels();
        const movieGenreInDB = await movieGenreSeqModel.findOne({ where: { id } });
        console.log("encontrado en DBBB", movieGenreInDB);
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        const movieInDB = await movieSeqModel.create(value);
        await movieGenreInDB.addPeliculas(movieInDB)//returns movieGenresMovies Element
        const movieUpdated = await movieSeqModel.findOne({ where: { id: movieInDB.id }, include: ["personajes"] });
        const result = recoverMovieModel(movieUpdated)
        return result;
      },

      addMovieToCharacter: async ({ id, value }) => {
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({ where: { id } });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const movieInDB = await movieSeqModel.create(value);
        await characterInDB.addPeliculas(movieInDB)//returns CharactersMovies Element
        const movieUpdated = await movieSeqModel.findOne({ where: { id: movieInDB.id }, include: ["personajes"] });
        const result = recoverMovieModel(movieUpdated)
        return result;
      },
      addCharacterToMovie: async ({ id, value }) => {
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        console.log("encontrado en DBBB", movieInDB);
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        const characterInDB = await characterSeqModel.create(value);
        console.log("nueva characterInDB creada: ", characterInDB)
        await movieInDB.addPersonajes(characterInDB)//returns CharactersMovies Element
        //const movieUpdated = await movieSeqModel.findOne({ where: { id },include:["personajes"] });
        const characterUpdated = await characterSeqModel.findOne({ where: { id: characterInDB.id }, include: ["peliculas"] });
        const result = recoverCharacterModel(characterUpdated)
        console.log("upd includes????? ", result)
        //const result = recoverMovieModel(movieUpdated)
        return result;
      },

      removeCharacterFromMovie: async ({ id, value }) => {
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        const characterInDB = await characterSeqModel.findOne({ where: { id: value } });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const resultante = await movieInDB.removePersonajes(characterInDB)
        console.log("resultantee-e--e-e-e-e--e-", resultante)
        const movieUpdated = await movieSeqModel.findOne({ where: { id: movieInDB.id }, include: ["personajes"] });
        const result = recoverMovieModel(movieUpdated)
        return result;
      },
      removeMovieFromMovieGenre: async ({ id, value }) => {
        const { movieSeqModel, movieGenreSeqModel } = await getSequelizeModels();

        const movieGenreInDB = await movieGenreSeqModel.findOne({ where: { id } });
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }

        const movieInDB = await movieSeqModel.findOne({ where: { id: value } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }

        const resultante = await movieGenreInDB.removePeliculas(movieInDB)//returns 1 if success
        console.log("resultantee-e--e-e-e-e--e-", resultante)

        const movieGenreUpdated = await movieGenreSeqModel.findOne({ where: { id:movieGenreInDB.id } , include: ["peliculas"]});
        const result = recoverMovieGenreModel(movieGenreUpdated)
        return result;
      },

      removeMovieFromCharacter: async ({ id, value }) => {
        const { characterSeqModel, movieSeqModel } = await getSequelizeModels();

        const characterInDB = await characterSeqModel.findOne({ where: { id } });
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const movieInDB = await movieSeqModel.findOne({ where: { id:value } });
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }

        const resultante = await characterInDB.removePeliculas(movieInDB)//return 1 if success
        console.log("resultantc-c-c-c-c-c-c-css-s-s-", resultante)

        const characterUpdated = await characterSeqModel.findOne({ where: { id: characterInDB.id }, include: ["peliculas"] });
        const result = recoverCharacterModel(characterUpdated)
        return result;
      },


      addMovieGenre: async (movieGenre) => {
        console.log("-------------ENTRANTEEEEEEE:", movieGenre);
        const { movieGenreSeqModel } = await getSequelizeModels();
        const dbMovieGenre = await movieGenreSeqModel.create(movieGenre);
        /**
         * ------- WE CONVERT ELEMENT DB TO OUR CUSTOM MODEL -------------------
         */
        const result = recoverMovieGenreModel(dbMovieGenre);
        return result;
      },

      addCharacter: async (character) => {
        //const sequelize = await (await connectSequelize).getInstance()
        const {
          characterSeqModel,
          movieSeqModel,
          movieGenreSeqModel,
          characterMovieSeqModel,
        } = await getSequelizeModels();

        /**
         * --------------------- SAVE MODELS IN DB -----------------
         */
        // GENERO
        //const movieGenreModel = buildMovieGenreModel(baseGenero)
        //const dbMovieGenre = await movieGenreSeqModel.create(movieGenreModel)

        //MOVIE
        //const movieModel = buildMovieModel(baseMovie)
        //const dbMovie = await movieSeqModel.create(movieModel);

        //CHARACTER
        const dbCharacter = await characterSeqModel.create(character);

        /**
         * ------ 2 WAYS TO ADD MOVIES TO A CHARACTER --------
         */
        //option 1
        // const result = await characterMovieSeqModel.create({
        //   characterId:dbCharacter.id,
        //   movieId:dbMovie.id
        // })
        //
        //option 2
        //dbCharacter.addPeliculas(dbMovie)

        /**
         * -------- WAY TO ADD MOVIE A UN GENERO ----------------
         */
        // const movieGenreInDB = await dbMovieGenre.addMovie(dbMovie)
        // console.log("***AFAFAFAFAFAFAFFAFAA", movieGenreInDB)

        /**
         * --------- WAY TO READ MOVIES FROM ESPECIFIC CHARACTER --------------
         * This way we can get movies include in query call
         */
        // const characterInDB = await characterSeqModel.findOne({ where: { id:dbCharacter.id },include:["peliculas"] });
        // console.log("**********resullllCharcterrr", characterInDB)

        /**
         * --------- WAY TO READ CHARACTERS FROM ESPECIFIC MOVIE --------------
         * This way we can get personajes include in query call
         */
        // const movieInDB = await movieSeqModel.findOne({ where: { id:dbMovie.id },include:["personajes"] });
        // console.log("**********resullllMovieeee", movieInDB)

        /**
         * ------- WE CONVERT ELEMENT DB TO OUR CUSTOM MODEL -------------------
         */
        const result = recoverCharacterModel(dbCharacter);
        return result;
      },
      getCharacterById: async (id) => {
        console.log("hahahahaha");
        const {
          characterSeqModel,
          movieSeqModel,
          movieGenreSeqModel,
          characterMovieSeqModel,
        } = await getSequelizeModels();




        /**
                * --------- WAY TO READ MOVIES FROM ESPECIFIC CHARACTER --------------
                * This way we can get movies include in query call
                */
        const characterInDB = await characterSeqModel.findOne({ where: { id }, include: ["peliculas"] });
        // console.log("**********resullllCharcterrr", characterInDB)



        //characterInDB = await characterSeqModel.findOne({ where: { id } });
        console.log("CCAAAS", characterInDB);
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        console.log("characterrr enDao:", characterInDB);


        if (characterInDB.peliculas.length != 0) {
          console.log("mapppppp  a pelicuuuuassss")
        }



        const result = recoverCharacterModel(characterInDB);
        return result;
      },
      getMovieById: async (id) => {
        console.log("hahah------2-2-2-2-2-2-2-2-- ahaha");
        const {
          characterSeqModel,
          movieSeqModel,
          movieGenreSeqModel,
          characterMovieSeqModel,
        } = await getSequelizeModels();




        /**
                 * --------- WAY TO READ CHARACTERS FROM ESPECIFIC MOVIE --------------
                 * This way we can get personajes include in query call
                 */
        const movieInDB = await movieSeqModel.findOne({ where: { id }, include: ["personajes"] });
        // console.log("**********resullllMovieeee", movieInDB)


        // movieInDB = await movieSeqModel.findOne({ where: { id } });
        console.log("CCAAAssssssss333335555S", movieInDB);





        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }



        if (movieInDB.personajes.length != 0) {
          console.log("mappppppeooo peersnoajes")
        }



        console.log("movieeee enDao:", movieInDB);
        const result = recoverMovieModel(movieInDB);
        return result;
      },
      getMovieGenreById: async (id) => {
        console.log("h555555555555555555555555555- ahaha", id);
        const {
          characterSeqModel,
          movieSeqModel,
          movieGenreSeqModel,
          characterMovieSeqModel,
        } = await getSequelizeModels();




        /**
                 * --------- WAY TO READ CHARACTERS FROM ESPECIFIC MOVIE --------------
                 * This way we can get personajes include in query call
                 */
        //TODOOOOO PROBARRRR???????? talvez es solo "movies"
        //const movieGenreInDB = await movieGenreSeqModel.findOne({ where: { id },include:["personajes"] });
        // console.log("**********resullllMovieeee", movieGenreInDB)


        //TODO TRAER CON LAS PELICULASSSSS
        const movieGenreInDB = await movieGenreSeqModel.findOne({ where: { id }, include: ["peliculas"] });
        console.log("CCAAeeeeeeeeeeS", movieGenreInDB);
        //chekar si ahora es addPeliculas()





        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }


        //VERIFIVCAR COMO SE LLAMA 
        // if(movieGenreInDB.personajes.length != 0){
        //   console.log("mappppppeooo peersnoajes")
        // }



        console.log("movieeeeGenreee enDao:", movieGenreInDB);
        //CAMBIARRRRRRR OJOOOO CUANDO COPIAS YN PEGAS
        const result = recoverMovieGenreModel(movieGenreInDB);
        return result;
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
