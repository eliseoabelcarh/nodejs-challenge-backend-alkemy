const useCaseSendEmail = (function () {

    let instance

    function create(emailSender) {

        return {

            send: async (data) => {
                const { from, to, subject, text, attachments } = data
                console.log("emailData::", data)
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