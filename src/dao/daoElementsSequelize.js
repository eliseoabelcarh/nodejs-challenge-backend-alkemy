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
} = require("../models/characterModel");
const { buildMovieGenreModel, recoverMovieGenreModel } = require("../models/movieGenreModel");
const { buildMovieModel, recoverMovieModel } = require("../models/movieModel");
const { createUserModel, recoverUserModel } = require("../models/userModel");
const {
  characterMovieSequelizeModel,
} = require("./daoModels/characterMovieSequelize");
const {
  characterSequelizeModel,
} = require("./daoModels/characterSequelizeModel");
const { movieSequelizeModel } = require("./daoModels/movieSequelizeModel");
const { userSequelizeModel } = require("./daoModels/userSequelizeModel");

let daoElementsSequelize = (function () {
  let instance;

  function create() {
    return {
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
      addMovieToMovieGenre: async ({id,value}) => {
        const {movieSeqModel ,movieGenreSeqModel } = await getSequelizeModels();
        const movieGenreInDB = await movieGenreSeqModel.findOne({ where: { id } });
        console.log("encontrado en DBBB", movieGenreInDB);
        if (!movieGenreInDB) {
          throw crearErrorRecursoNoEncontrado("movieGenre", id);
        }
        const movieInDB = await movieSeqModel.create(value);
        console.log("nueva mocvie creada: ", movieInDB)
        await movieGenreInDB.addPeliculas(movieInDB)//returns movieGenresMovies Element
        const movieGenreUpdated = await movieGenreSeqModel.findOne({ where: { id },include:["peliculas"] });
        console.log("update movieGenre:moviesincludes////*****????? ", movieGenreUpdated)
        const result = recoverMovieGenreModel(movieGenreUpdated)
        return result;
      },


      addMovieToCharacter: async ({id,value}) => {
        const {characterSeqModel ,movieSeqModel } = await getSequelizeModels();
        const characterInDB = await characterSeqModel.findOne({ where: { id } });
        console.log("encontrado en DBBB", characterInDB);
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        const movieInDB = await movieSeqModel.create(value);
        console.log("nueva mocvie creada: ", movieInDB)
        await characterInDB.addPeliculas(movieInDB)//returns CharactersMovies Element
        const characterUpdated = await characterSeqModel.findOne({ where: { id },include:["peliculas"] });
        console.log("update character:moviesincludes????? ", characterUpdated)
        const result = recoverCharacterModel(characterUpdated)
        return result;
      },
      addCharacterToMovie: async ({id,value}) => {
        const {characterSeqModel ,movieSeqModel } = await getSequelizeModels();
        const movieInDB = await movieSeqModel.findOne({ where: { id } });
        console.log("encontrado en DBBB", movieInDB);
        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }
        const characterInDB = await characterSeqModel.create(value);
        console.log("nueva characterInDB creada: ", characterInDB)
        await movieInDB.addPersonajes(characterInDB)//returns CharactersMovies Element
        const movieUpdated = await movieSeqModel.findOne({ where: { id },include:["personajes"] });
        console.log("update ------  includes????? ", movieUpdated)
        const result = recoverMovieModel(movieUpdated)
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
        const characterInDB = await characterSeqModel.findOne({ where: { id },include:["peliculas"] });
        // console.log("**********resullllCharcterrr", characterInDB)



        //characterInDB = await characterSeqModel.findOne({ where: { id } });
        console.log("CCAAAS", characterInDB);
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", id);
        }
        console.log("characterrr enDao:", characterInDB);


        if(characterInDB.peliculas.length != 0){
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
         const movieInDB = await movieSeqModel.findOne({ where: { id },include:["personajes"] });
        // console.log("**********resullllMovieeee", movieInDB)


       // movieInDB = await movieSeqModel.findOne({ where: { id } });
        console.log("CCAAAssssssss333335555S", movieInDB);





        if (!movieInDB) {
          throw crearErrorRecursoNoEncontrado("movie", id);
        }



        if(movieInDB.personajes.length != 0){
          console.log("mappppppeooo peersnoajes")
        }



        console.log("movieeee enDao:", movieInDB);
        const result = recoverMovieModel(movieInDB);
        return result;
      },
      getMovieGenreById: async (id) => {
        console.log("h555555555555555555555555555- ahaha",id);
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
       const movieGenreInDB = await movieGenreSeqModel.findOne({ where: { id } ,include:["peliculas"]});
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
