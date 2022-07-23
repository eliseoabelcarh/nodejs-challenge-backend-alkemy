const { crearEmailNodemailer } = require('../model/emailModel')
const { crearErrorArgumentosInvalidos } = require('../../errors/errorsHandler')
const nodemailer = require('nodemailer')


const crearEmailSenderNodemailer = async (config) => {
    if (!config) {
        throw crearErrorArgumentosInvalidos("Nodemailer Config Object", "required object")
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.user,
            pass: config.pass
        }
    })

    return {
        getEmailSender: config.user,
        //Theres not neccesary to send FROM field, by default takes of the credentials
        sendEmail: async function ({ from = config.user, to, subject, text, attachments }) {
            const email = crearEmailNodemailer({ from, to, subject, text, attachments })
            await send(transporter, email)
            return true
        }
    }
}

async function send(transporter, mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Nodemailer => Email sent: ' + info.response);
        }
    });
}


module.exports = {
    crearEmailSenderNodemailer
}