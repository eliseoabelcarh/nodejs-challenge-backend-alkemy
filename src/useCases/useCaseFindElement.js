/**
 * --------------------------------- USE CASE TO FIND ELEMENT -----------------------------
 * This developed using Singleton Pattern and Dependency Injection. This object receives 
 * a Tasker object to be instantiate using a dependency injection. 
 * This object exists in case we need to add some business logic related to useCase.
 * You have to determines what business logic includes here or include in Tasker object.
 */

const useCaseFindElement = (function () {
  let instance;

  function create(finder) {
    return {
      find: async (data) => {
        const { type, field, value } = data;
        return await finder.findData({ type, field, value });
      },
    };
  }

  return {
    getInstance: function (finder) {
      if (!instance) {
        instance = create(finder);
      }
      return instance;
    },
  };
})();

module.exports = useCaseFindElement;
