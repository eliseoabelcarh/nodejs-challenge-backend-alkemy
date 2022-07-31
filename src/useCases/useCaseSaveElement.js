
/**
 * --------------------------------- USE CASE TO SAVE ELEMENT -----------------------------
 * This developed using Singleton Pattern and Dependency Injection. This object receives 
 * a Tasker object to be instantiate using a dependency injection. 
 * This object exists in case we need to add some business logic related to useCase.
 * You have to determines what business logic includes here or include in Tasker object.
 */
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
