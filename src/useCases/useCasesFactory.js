const { crearFinder } = require("../finder")
const { crearStorer } = require("../storer/index")
const useCaseLoginUser = require("./useCaseLoginUser")
const useCaseSaveElement = require("./useCaseSaveElement")
const useCaseSearchElement = require("./useCaseFindElement")
const { crearEmailSender } = require("../emailSender/emailSender")
const useCaseSendEmail = require("./useCaseSendEmail")
const storer = crearStorer()
const finder = crearFinder()

const useCasesFactory = {

    cuSaveElement: () => {
        return useCaseSaveElement.getInstance(storer)
    },
    cuLogin:() =>{
        return useCaseLoginUser.getInstance(finder)
    },
    cuSearchElement:() =>{
        return useCaseSearchElement.getInstance(finder)
    },
    cuSendEmail:async ()=>{
        const emailSender = await crearEmailSender(/**optional:config */)
        return useCaseSendEmail.getInstance(emailSender)
    }
 
    
}

module.exports = useCasesFactory