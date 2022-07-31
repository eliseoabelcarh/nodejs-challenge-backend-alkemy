/**
 * ------------------------------ FINDER MOVIE ----------------------------------
 * This object knows how find MOVIES, using any parameter. 
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const finderMovie = (function () {
    let instance;
  
    function create(dao) {
      return {
        searchByField: async ({ field, value }) => {
          if (field === "id") {
            return await dao.getMovieById(value);
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
  
  module.exports = finderMovie;
  