const { configurations } = require("../configurations/configs");
const { crearErrorArgumentosInvalidos } = require("../errors/errorsHandler");
const { crearEmailSenderNodemailer } = require("./nodemailer/index");
const { crearEmailSenderSendgrid } = require("./sendGrid/index");

/**
 * ----------------------------------------- EMAIL SENDER MODULE ------------------------------
 * 
 * This module is used for send emails, i used for send emails when user is registered, 
 * You can choose between Sendgrid service or Nodemailer service
 * By default i used Nodemailer, but Sendgrip is 100% operative and tested (See it in Test folder)
 * You can enable function to send emails in Configurations folder when user login or register.
 * Tests will work anyway if you disable because they are independent.
 * "Enable or disable" is for let us do tests with less conflicts with provider when we send too many
 * emails in a short time.
 * 
 * If case the Config Object is not sent, the Default configuration is taken (configurations folder)
 * 
 * You can use this configurations models depends what service you choose.
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
