
/**
 * ------------------------------- USE CASES AVAILABLES -----------------------------------
 * Every useCase knows how handle requests with specific use case in our app,
 * also every object in charge of doing the tasks (like storer, finder,..etc) are neccesary 
 * to complete the missions.
 * This architecture provides me modularity and high cohesion with low coupling.
 */
const useCaseLoginUser = require("./useCaseLoginUser")
const useCaseSaveElement = require("./useCaseSaveElement")
const useCaseFindElement = require("./useCaseFindElement")
const useCaseSendEmail = require("./useCaseSendEmail")
const useCaseUpdateElement = require("./useCaseUpdateElement")
const useCaseDeleteElement = require("./useCaseDeleteElement")
const useCaseGetList = require("./useCaseGetList")

/**
 * ------------------------ CREATING OUR WORKERS IN CHARGE OF THE TASKS -----------------------
 */
const { crearFinder } = require("../finder")
const { crearStorer } = require("../storer/index")
const { crearUpdater } = require("../updater")
const { crearRemover } = require("../remover")
const { crearEmailSender } = require("../emailSender/emailSender")
const { crearStrainer } = require("../strainer")
const storer = crearStorer()
const finder = crearFinder()
const updater = crearUpdater()
const remover = crearRemover()
const strainer = crearStrainer()


/**
 * ------------------------------- USE CASES FACTORY -----------------------------------
 * This pattern Factory provides me easy handling for different use cases requests
 * Every one are totally independent of each other.
 * You have to consider add every business logic inside useCase element, instead of doing in
 * the taskers(storer, updater, finder,...etc) Example: Validate password inside cuLogin
 * We use DEPENDENCY INJECTION.
 */
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
    cuGetList:() => {
        return useCaseGetList.getInstance(strainer)
    },
 
    
}

module.exports = useCasesFactory