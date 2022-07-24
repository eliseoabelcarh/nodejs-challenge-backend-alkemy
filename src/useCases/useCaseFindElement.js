const useCaseSearchElement = (function () {

    let instance

    function create(finder) {

        return {
            
            find: async (data) => {
                const {type, field, value} = data
                //check si existe datos
                return await finder.findData({type, field, value})
                
        
            }
        }
    }

    return {
        getInstance: function (finder) {
            if (!instance) {
                instance = create(finder)
            }
            return instance
        }
    }
}
)()

module.exports = useCaseSearchElement