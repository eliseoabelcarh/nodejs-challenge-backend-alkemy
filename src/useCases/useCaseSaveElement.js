const useCaseSaveElement = (function () {
  let instance;

  function create(storer) {
    return {
      saveElement: async (data) => {
        const {type, value} = data
        return await storer.storeData({ type, value });
      },
    };
  }

  return {
    getInstance: function (storer) {
      if (!instance) {
        instance = create(storer);
      }
      return instance;
    },
  };
})();

module.exports = useCaseSaveElement;
