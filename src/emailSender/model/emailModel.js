let { crearErrorArgumentosInvalidos } = require("../../errors/errorsHandler");
const { generateFileObjectNodemailer } = require("../nodemailer/fieObject");
const { generateFileObjectFromPath } = require("../sendGrid/fileObject");

function crearObjetoEmail({ from, to, subject, text }) {
  let email = {};
  if (!from) {
    throw crearErrorArgumentosInvalidos("from", "campo requerido");
  }
  if (!to) {
    throw crearErrorArgumentosInvalidos("to", "campo requerido");
  }
  if (!subject) {
    throw crearErrorArgumentosInvalidos("subject", "campo requerido");
  }
  if (!text) {
    throw crearErrorArgumentosInvalidos("html", "campo requerido");
  }
  email.from = from;
  email.to = to;
  email.subject = subject;
  email.html = text;
  return email;
}

function crearEmailBase(objeto) {
  let email = {};
  if (!objeto.from) {
    throw crearErrorArgumentosInvalidos("from", "campo requerido");
  }
  if (!objeto.to) {
    throw crearErrorArgumentosInvalidos("to", "campo requerido");
  }
  if (!objeto.subject) {
    throw crearErrorArgumentosInvalidos("subject", "campo requerido");
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
    throw crearErrorArgumentosInvalidos("text", "campo requerido");
  }
  email.text = objeto.text;
  email = { ...base, ...email };

  return email;
}

function crearEmailConTextoPlanoYHtml(objeto) {
  let email = {};
  const base = crearEmailConTextoPlano(objeto);
  if (!objeto.html) {
    throw crearErrorArgumentosInvalidos("html", "campo requerido");
  }
  email.html = objeto.html;
  email = { ...base, ...email };
  return email;
}

function crearEmailConTextoPlanoYHtmlYAttachmentVacio(objeto) {
  let email = {};
  const base = crearEmailConTextoPlanoYHtml(objeto);
  if (!objeto.attachments) {
    throw crearErrorArgumentosInvalidos("attachments", "campo requerido");
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
    throw crearErrorArgumentosInvalidos("fileObject", "campo requerido");
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

module.exports = {
  crearEmailConTextoPlano,
  crearEmailConTextoPlanoYHtml,
  crearEmailConTextoPlanoYHtmlYAttachmentVacio,
  crearEmailConTextoPlanoYHtmlYAttachmentConFiles,
  crearEmailConCamposOpcionales,
  crearEmailNodemailer,
};
