/**
 * --------------------- USE CASE TO GET LIST OF ELEMENTS -----------------------------
 * This developed using Singleton Pattern and Dependency Injection. This object receives 
 * a Tasker object to be instantiate using a dependency injection. 
 * This object exists in case we need to add some business logic related to useCase.
 * You have to determines what business logic includes here or include in Tasker object.
 */

const useCaseGetList = (function () {
    let instance;

    function create(strainer) {
        return {
            get: async (data) => {
                const { type, visibleFields, queries } = data;
                return await strainer.strainData({ type, visibleFields, queries });
            },
        };
    }

    return {
        getInstance: function (strainer) {
            if (!instance) {
                instance = create(strainer);
            }
            return instance;
        },
    };
})();

module.exports = useCaseGetList;
