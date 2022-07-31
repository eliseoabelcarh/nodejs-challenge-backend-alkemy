require("dotenv").config()
/**
 * ------------------------------------- APP CONFIGURATIONS -------------------------------------
 * All app need this configurations for work, also tests.
 * You can hardcode this variables or use you own .env file 
 */

// This is for use it with Nodemailer email Sender
// by default is enable this option, you should see
// nodemailer documentation to use a valid email 
// you read more in https://nodemailer.com/usage/using-gmail/
const configNodemailer = {
  user: process.env.GMAIL_FOR_NODEMAILER_USER,
  pass: process.env.GMAIL_PASSWORD_FOR_NODEMAILER,
  service: "nodemailer",
};
// This is for use it with Sendgrid email Sender
// by default is enable Nodemailer,so you have to enable manually
// returning "sendgrid" (type: String) for emailSenderServiceDefault function
const configSendgrid = {
  apiKey: process.env.SENDGRID_API_KEY,
  user: process.env.SENDGRID_USER_EMAIL,
  service: "sendgrid",
};

module.exports.configurations = {
  emailSenderServiceDefault: () => process.EMAIL_SENDER_SERVICE_FAULT || "nodemailer",
  emailSenderSendgridConfigs: () => configSendgrid,
  emailSenderNodemailerConfigs: () => configNodemailer,
  daoConfig: () => process.env.DAO_TYPE || 'memory',
  getStrategyAuth: () => process.env.STRATEGY_AUTH || 'jwt',
  /**
   * TRUE: enables function to sendEmails in JWT Register and JWT Login
   * FALSE: disable send emails
   * Only works for server.js file, tests are independent of this configuration.
   */
  emailSenderIsEnable: () => false // 
}