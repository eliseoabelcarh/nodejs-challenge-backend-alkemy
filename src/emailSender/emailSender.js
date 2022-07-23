const { configurations } = require("../configurations/configs");
const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { crearEmailSenderNodemailer } = require("./nodemailer/index");
const { crearEmailSenderSendgrid } = require("./sendGrid/index");

/**
 * ----------------------- EMAIL SENDER ------------------
 * If Config Object is not sent, default config is taken (configurations folder)
    Sendgrid Example: config = {
      apiKey: process.env.SENDGRID_API_KEY,
      user: process.env.SENDGRID_USER_EMAIL,
      service: "sendgrid",
    }
    Nodemailer Example: config = {
      user: process.env.GMAIL_FOR_NODEMAILER_USER,
      pass: process.env.GMAIL_PASSWORD_FOR_NODEMAILER,
      service: "nodemailer",
    }
 *
 */
const crearEmailSender = async function (config) {
  let emailSenderService;
  if (!config) {
    emailSenderService = configurations.emailSenderServiceDefault();
    return await getSender(emailSenderService);
  } else {
    return await getSender(config.service);
  }
};

/**
 * 
 *---------------- SENDER EMAIL FACTORY BY SERVICE ------------------------- 
 */
async function getSender(emailSenderService) {
  switch (emailSenderService) {
    case "sendgrid":
      return await crearEmailSenderSendgrid(
        configurations.emailSenderSendgridConfigs()
      );
    case "nodemailer":
      return await crearEmailSenderNodemailer(
        configurations.emailSenderNodemailerConfigs()
      );
    default:
      throw crearErrorArgumentosInvalidos("Email Sender Service", "required");
  }
}

module.exports = { crearEmailSender };
