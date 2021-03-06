let { crearErrorArgumentosInvalidos } = require("../../errors/errorsHandler");
const { generateFileObjectNodemailer } = require("../nodemailer/fieObject");
const { generateFileObjectFromPath } = require("../sendGrid/fileObject");

/**
 *
 * -------------------- BASE EMAIL SENDGRID MODELS -----------------------
 *
 * Different options to create Email and field validations
 * i will use crearEmailConCamposOpcionales function by default
 * the rest functions are tested and you can use it if you need it
 */
function crearEmailBase(objeto) {
  let email = {};
  if (!objeto.from) {
    throw crearErrorArgumentosInvalidos("from", "required field");
  }
  if (!objeto.to) {
    throw crearErrorArgumentosInvalidos("to", "required field");
  }
  if (!objeto.subject) {
    throw crearErrorArgumentosInvalidos("subject", "required field");
  }
  //VALIDATE IF --- TO:email -- AND -- FROM:email --- ARE OR NOT VALID EMAILS
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegexp.test(objeto.from)) {
    throw crearErrorArgumentosInvalidos("email FROM:", "invalid format");
  }
  if (!emailRegexp.test(objeto.to)) {
    throw crearErrorArgumentosInvalidos("email TO:", "invalid format");
  }
  email.from = objeto.from;
  email.to = objeto.to;
  email.subject = objeto.subject;
  return email;
}

function crearEmailConTextoPlano(objeto) {
  let email = {};
  const base = crearEmailBase(objeto);
  if (!objeto.text) {
    throw crearErrorArgumentosInvalidos("text", "required field");
  }
  email.text = objeto.text;
  email = { ...base, ...email };

  return email;
}

function crearEmailConTextoPlanoYHtml(objeto) {
  let email = {};
  const base = crearEmailConTextoPlano(objeto);
  if (!objeto.html) {
    throw crearErrorArgumentosInvalidos("html", "required field");
  }
  email.html = objeto.html;
  email = { ...base, ...email };
  return email;
}

function crearEmailConTextoPlanoYHtmlYAttachmentVacio(objeto) {
  let email = {};
  const base = crearEmailConTextoPlanoYHtml(objeto);
  if (!objeto.attachments) {
    throw crearErrorArgumentosInvalidos("attachments", "required field");
  }
  email.attachments = objeto.attachments;
  email = { ...base, ...email };
  return email;
}

function crearEmailConTextoPlanoYHtmlYAttachmentConFiles(
  objeto,
  arrayConPathDeArchivos
) {
  let email = {};
  email.attachments = [];
  const base = crearEmailConTextoPlanoYHtmlYAttachmentVacio(objeto);
  if (!arrayConPathDeArchivos.length) {
    throw crearErrorArgumentosInvalidos("fileObject", "required field");
  }
  for (let i = 0; i < arrayConPathDeArchivos.length; i++) {
    const rutaElemento = arrayConPathDeArchivos[i];
    let fileObject = generateFileObjectFromPath(rutaElemento);
    email.attachments.push(fileObject);
  }
  email = { ...base, ...email };
  return email;
}

function crearEmailConCamposOpcionales(from, to, subject, text, attachments) {
  let email = {};
  const base = crearObjetoEmail({ from, to, subject, text });
  if (attachments) {
    email.attachments = [];
    for (let i = 0; i < attachments.length; i++) {
      const rutaElemento = attachments[i];
      let fileObject = generateFileObjectFromPath(rutaElemento);
      email.attachments.push(fileObject);
    }
  }
  email = { ...base, ...email };
  return email;
}

/**
 * ------------------   NODEMAILER BASE EMAIL MODEL -------------------
 *
 */
function crearEmailNodemailer({ from, to, subject, text, attachments }) {
  let email = {};
  const base = crearObjetoEmail({ from, to, subject, text });
  if (attachments) {
    email.attachments = [];
    for (let i = 0; i < attachments.length; i++) {
      const rutaElemento = attachments[i];
      let fileObject = generateFileObjectNodemailer(rutaElemento);
      email.attachments.push(fileObject);
    }
  }
  email = { ...base, ...email };
  return email;
}
/**
 * -------------------- VALIDATE FIELDS WITH REQUIRED FIELDS -----------------------------
 */
function crearObjetoEmail({ from, to, subject, text }) {
  let email = {};
  if (!from) {
    throw crearErrorArgumentosInvalidos("from", "required field");
  }
  if (!to) {
    throw crearErrorArgumentosInvalidos("to", "required field");
  }
  if (!subject) {
    throw crearErrorArgumentosInvalidos("subject", "required field");
  }
  if (!text) {
    throw crearErrorArgumentosInvalidos("html", "required field");
  }
  //VALIDATE IF --- TO:email -- AND -- FROM:email --- ARE OR NOT VALID EMAILS
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(from)) {
    throw crearErrorArgumentosInvalidos("email FROM:", "invalid format");
  }
  if (!emailRegexp.test(to)) {
    throw crearErrorArgumentosInvalidos("email TO:", "invalid format");
  }
  email.from = from;
  email.to = to;
  email.subject = subject;
  email.html = text;
  return email;
}

module.exports = {
  crearEmailConTextoPlano,
  crearEmailConTextoPlanoYHtml,
  crearEmailConTextoPlanoYHtmlYAttachmentVacio,
  crearEmailConTextoPlanoYHtmlYAttachmentConFiles,
  crearEmailConCamposOpcionales,
  crearEmailNodemailer,
};
