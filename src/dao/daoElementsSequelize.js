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
const { buildMovieGenreModel } = require("../models/movieGenreModel");
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
        let characterInDB;
        console.log("haha---------------------------hahaha", id);
        characterInDB = await characterSeqModel.findOne({ where: { id } });
        console.log("CCAAAS", characterInDB);
        if (!characterInDB) {
          throw crearErrorRecursoNoEncontrado("character", idBuscado);
        }
        console.log("characterrr enDao:", characterInDB);
        const result = recoverCharacterModel(characterInDB);
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
