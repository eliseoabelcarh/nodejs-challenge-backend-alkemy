const { crearFinder } = require("../finder")
const { crearStorer } = require("../storer/index")
const useCaseLoginUser = require("./useCaseLoginUser")
const useCaseRegisterUser = require("./useCaseRegisterUser")
const useCaseSearchElement = require("./useCaseFindElement")
const storer = crearStorer()
const finder = crearFinder()

const useCasesFactory = {

    cuRegister: () => {
        return useCaseRegisterUser.getInstance(storer)
    },
    cuLogin:() =>{
        return useCaseLoginUser.getInstance(finder)
    },
    cuSearchElement:() =>{
        return useCaseSearchElement.getInstance(finder)
    }
 
    
}

module.exports = useCasesFactory