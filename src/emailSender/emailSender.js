


const { crearErrorArgumentosInvalidos } = require('../errors/errorsHandler')
const { crearEmailSenderNodemailer } = require('./nodemailer/index')
const { crearEmailSenderSendgrid } = require('./sendGrid/index')

const crearEmailSender = async function (config) {
    if (config.service === 'sendgrid') {
        return await crearEmailSenderSendgrid(config)
    }
    if (config.service === 'nodemailer') {
        return await crearEmailSenderNodemailer(config)
    }
    else {
     throw crearErrorArgumentosInvalidos("Service Config Object","required")
    }
}


module.exports = { crearEmailSender }