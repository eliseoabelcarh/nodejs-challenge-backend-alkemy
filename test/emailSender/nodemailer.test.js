const emailExample = require("./examples");
const {
  crearEmailNodemailer,
} = require("../../src/emailSender/model/emailModel");
const assert = require("assert");
const {
  crearEmailSenderNodemailer,
} = require("../../src/emailSender/nodemailer");

describe("CON MODELOS DE EMAILS INVÁLIDOS Y CAMPOS FALTANTES", () => {
  describe("----PRUEBA MÚLTIPLE:---- se crea email sin algún required field", () => {
    it("se recibe error de acuerdo al campo faltante", () => {
      const erroresARecibir = [
        "from: required field",
        "to: required field",
        "subject: required field",
        "text: required field",
      ];
      const camposInvalidos = [
        emailExample.sinSender,
        emailExample.sinRecipient,
        emailExample.sinSubject,
        emailExample.sinMessage,
      ];
      async function test(emailSinAlgunCampo) {
        assert.throws(
          () => {
            crearEmailNodemailer(emailSinAlgunCampo);
          },
          (error) => {
            erroresARecibir.should.matchAny(error.message);
            return true;
          }
        );
      }
      for (let i = 0; i < camposInvalidos.length; i++) {
        const element = camposInvalidos[i];
        test(element);
      }
    });
  });
});

xdescribe("envío nodemailer de email con campos mínimos y archivo adjunto", () => {
  it("recibo respuesta exitosa", async () => {
    //reemplace variables de entorno creando un archivo .env
    const config = {
      user: process.env.GMAIL_FOR_NODEMAILER_USER,
      pass: process.env.GMAIL_PASSWORD_FOR_NODEMAILER,
    };
    const emailSender = await crearEmailSenderNodemailer(config);
    const mail = {
      from: config.user,
      to: "eliseoabelcarh1@gmail.com",
      subject: "Hola Desde Acá Nodemailer Testt",
      text: "helloooo moto!",
      attachments: ["./test/emailSender/ejemplo.pdf"],
    };
    const recibido = await emailSender.sendEmail(mail);
    const esperado = true;
    assert.deepStrictEqual(recibido, esperado);
  });
});
