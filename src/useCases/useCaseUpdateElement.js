const useCaseUpdateElement = (function () {
    let instance;
  
    function create(updater) {
      return {
        update: async (data) => {
          const { type, id, action, field, value } = data;
          return await updater.updateData({ type, id, action, field, value });
        },
      };
    }
  
    return {
      getInstance: function (updater) {
        if (!instance) {
          instance = create(updater);
        }
        return instance;
      },
    };
  })();
  
  module.exports = useCaseUpdateElement;