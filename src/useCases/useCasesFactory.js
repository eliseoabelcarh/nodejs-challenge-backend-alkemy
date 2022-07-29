const { crearFinder } = require("../finder")
const { crearStorer } = require("../storer/index")
const { crearUpdater } = require("../updater")
const { crearRemover } = require("../remover")
const { crearEmailSender } = require("../emailSender/emailSender")
const useCaseLoginUser = require("./useCaseLoginUser")
const useCaseSaveElement = require("./useCaseSaveElement")
const useCaseFindElement = require("./useCaseFindElement")
const useCaseSendEmail = require("./useCaseSendEmail")
const useCaseUpdateElement = require("./useCaseUpdateElement")
const useCaseDeleteElement = require("./useCaseDeleteElement")

const storer = crearStorer()
const finder = crearFinder()
const updater = crearUpdater()
const remover = crearRemover()

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
    cuFindElement:() =>{
        return useCaseFindElement.getInstance(finder)
    },
    cuSendEmail:async ()=>{
        const emailSender = await crearEmailSender(/**optional:config */)
        return useCaseSendEmail.getInstance(emailSender)
    },
    cuDeleteElement: () => {
        return useCaseDeleteElement.getInstance(remover)
    },
 
    
}

module.exports = useCasesFactory