/**
 * --------------------------------- USE CASE DELETE ELEMENT -----------------------------
 * This developed using Singleton Pattern and Dependency Injection. This object receives 
 * a Tasker object to be instantiate using a dependency injection. 
 * This object exists in case we need to add some business logic related to useCase.
 * You have to determines what business logic includes here or include in Tasker object.
 */

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
  