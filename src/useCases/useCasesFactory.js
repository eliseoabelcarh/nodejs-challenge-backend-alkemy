const { crearFinder } = require("../finder")
const { crearStorer } = require("../storer/index")
const { crearUpdater } = require("../updater")
const { crearEmailSender } = require("../emailSender/emailSender")
const useCaseLoginUser = require("./useCaseLoginUser")
const useCaseSaveElement = require("./useCaseSaveElement")
const useCaseSearchElement = require("./useCaseFindElement")
const useCaseSendEmail = require("./useCaseSendEmail")
const useCaseUpdateElement = require("./useCaseUpdateElement")
const storer = crearStorer()
const finder = crearFinder()
const updater = crearUpdater()

const useCasesFactory = {

    cuSaveElement: () => {
        return useCaseSaveElement.getInstance(storer)
    },
    cuUpdateElement: () => {
        return useCaseUpdateElement.getInstance(updater)
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