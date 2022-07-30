const { crearErrorEnModulo } = require("../errors/errorsHandler");
const { prepareFieldsToModifyInMovieGenreModel } = require("../models/movieGenreModel");
const { buildMovieModel } = require("../models/movieModel");



const updaterMovieGenre = (function () {
    let instance;
  
    function create(dao) {
      return {
        updateElement: async ({id, action, field, value}) => {
          if (action === "add" && field === "movie") {
            if(value.hasOwnProperty('movieId')){
              return await dao.addMovieToMovieGenreWithIds({ id, value: value.movieId });
            }else{
              const movieModel = buildMovieModel(value)
            return await dao.addMovieToMovieGenre({id,value:movieModel});
            } 
          }
          if (action === "remove" && field === "movie") {
            //id = MovieGenreID value = movieID
            return await dao.removeMovieFromMovieGenre({id,value});
          }
          if (action === "modify" && field === "element") {
            const prepared = prepareFieldsToModifyInMovieGenreModel(value)
            return await dao.updateMovieGenre({ id, value:prepared });
          }
          else{
            throw crearErrorEnModulo("updater: action or field invalid")
          }
          
        },
      };
    }
  
    return {
      getInstance: function (dao) {
        if (!instance) {
          instance = create(dao);
        }
        return instance;
      },
    };
  })();
  
  module.exports = updaterMovieGenre;