
require("dotenv").config()





const configNodemailer = {
    user: process.env.GMAIL_FOR_NODEMAILER_USER,
    pass: process.env.GMAIL_PASSWORD_FOR_NODEMAILER,
    service: "nodemailer",
  };
  const configSendgrid = {
    apiKey: process.env.SENDGRID_API_KEY,
    user: process.env.SENDGRID_USER_EMAIL,
    service: "sendgrid",
  };


module.exports.configurations = {

    emailSenderServiceDefault: () => process.EMAIL_SENDER_SERVICE_FAULT || "nodemailer",
    emailSenderSendgridConfigs: () => configSendgrid,
    emailSenderNodemailerConfigs:() => configNodemailer,
    daoConfig:() => process.env.DAO_TYPE || 'memory'
    
}