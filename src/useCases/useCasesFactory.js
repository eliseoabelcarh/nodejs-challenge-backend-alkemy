const { crearStorer } = require("../storer/index")
const useCaseRegisterUser = require("./useCaseRegisterUser")
const storer = crearStorer()

const useCasesFactory = {

    cuRegister: () => {
        return useCaseRegisterUser.getInstance(storer)
    },
 
    
}

module.exports = useCasesFactory