const useCaseDeleteElement = (function () {
    let instance;
  
    function create(remover) {
      return {
        deleteElement: async (data) => {
          const {type, value} = data
          return await remover.removeData({ type, value });
        },
      };
    }
  
    return {
      getInstance: function (remover) {
        if (!instance) {
          instance = create(remover);
        }
        return instance;
      },
    };
  })();
  
  module.exports = useCaseDeleteElement;
  