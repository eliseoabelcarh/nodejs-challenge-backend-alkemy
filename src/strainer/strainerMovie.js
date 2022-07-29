const strainerMovie = (function () {
    let instance;
  
    function create(dao) {
      return {
        getData: async ({ visibleFields, queries }) => {
            //TODO aca no...pero modelar un objeto WHERE en DAOOO  para sequelize reconozca
            console.log("Eddcsnn STRAINERR ",{ visibleFields, queries } )
            return await dao.getMovieList({ visibleFields, queries });
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
  
  module.exports = strainerMovie;
  