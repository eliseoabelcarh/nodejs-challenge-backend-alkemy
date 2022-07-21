const useCaseSearchElement = (function () {

    let instance

    function create(searcher) {

        return {
            
            search: async (data) => {
                const {type, field, value} = data
                //check si existe datos
                return await searcher.searchData({type, field, value})
                
        
            }
        }
    }

    return {
        getInstance: function (searcher) {
            if (!instance) {
                instance = create(searcher)
            }
            return instance
        }
    }
}
)()

module.exports = useCaseSearchElement