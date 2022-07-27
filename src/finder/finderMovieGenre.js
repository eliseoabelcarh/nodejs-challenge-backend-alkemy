const finderMovieGenre = (function () {
    let instance;
  
    function create(dao) {
      return {
        searchByField: async ({ field, value }) => {
          if (field === "id") {
            return await dao.getMovieGenreById(value);
          }
          // if (field === "username") {
          //   return await dao.getUserByUsername(value);
          // }
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
  