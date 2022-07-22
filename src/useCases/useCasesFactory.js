const { crearSearcher } = require("../searcher")
const { crearStorer } = require("../storer/index")
const useCaseLoginUser = require("./useCaseLoginUser")
const useCaseRegisterUser = require("./useCaseRegisterUser")
const useCaseSearchElement = require("./useCaseSearchElement")
const storer = crearStorer()
const searcher = crearSearcher()

const useCasesFactory = {

    cuRegister: () => {
        return useCaseRegisterUser.getInstance(storer)
    },
    cuLogin:() =>{
        return useCaseLoginUser.getInstance(searcher)
    },
    cuSearchElement:() =>{
        return useCaseSearchElement.getInstance(searcher)
    }
 
    
}

module.exports = useCasesFactory