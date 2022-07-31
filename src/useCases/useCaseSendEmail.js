
/**
 * --------------------------------- USE CASE TO SEND EMAIL -----------------------------
 * This developed using Singleton Pattern and Dependency Injection. This object receives 
 * a Tasker object to be instantiate using a dependency injection. 
 * This object exists in case we need to add some business logic related to useCase.
 * You have to determines what business logic includes here or include in Tasker object.
 */

const useCaseSendEmail = (function () {

    let instance

    function create(emailSender) {

        return {

            send: async (data) => {
                const { from, to, subject, text, attachments } = data
                return await emailSender.sendEmail({ from, to, subject, text, attachments })
            }
        }
    }

    return {
        getInstance: function (emailSender) {
            if (!instance) {
                instance = create(emailSender)
            }
            return instance
        }
    }
}
)()

module.exports = useCaseSendEmail