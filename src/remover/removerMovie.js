const removerMovie = (function () {
    let instance;
    function create(dao) {
      return {
        remove: async (data) => {
          return await dao.removeMovie(data);
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
  
  module.exports = removerMovie;
  