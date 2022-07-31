/**
 * --------------------------------- USE CASE TO UPDATE ELEMENT -----------------------------
 * This developed using Singleton Pattern and Dependency Injection. This object receives 
 * a Tasker object to be instantiate using a dependency injection. 
 * This object exists in case we need to add some business logic related to useCase.
 * You have to determines what business logic includes here or include in Tasker object.
 */

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