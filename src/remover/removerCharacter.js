const removerCharacter = (function () {
    let instance;
    function create(dao) {
      return {
        remove: async (data) => {
          return await dao.removeCharacter(data);
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
  
  module.exports = removerCharacter;
  