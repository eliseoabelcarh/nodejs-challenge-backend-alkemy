const strainerCharacter = (function () {
    let instance;
  
    function create(dao) {
      return {
        getData: async ({ visibleFields, queries }) => {
            //TODO modelar un objeto WHERE  para sequelize reconozca
            console.log("ENNNNNN STRAINERR ",{ visibleFields, queries } )
            return await dao.getCharacterList({ visibleFields, queries });
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
  
  module.exports = strainerCharacter;
  