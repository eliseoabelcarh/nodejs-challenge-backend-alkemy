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
