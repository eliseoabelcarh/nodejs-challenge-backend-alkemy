/**
 * ------------------------------ FINDER MOVIE GENRE ----------------------------------
 * This object knows how find MOVIE GENRES, using any parameter. 
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const finderMovieGenre = (function () {
    let instance;
  
    function create(dao) {
      return {
        searchByField: async ({ field, value }) => {
          if (field === "id") {
            return await dao.getMovieGenreById(value);
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
  
  module.exports = finderMovieGenre;
  