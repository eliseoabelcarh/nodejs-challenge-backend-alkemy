let { crearErrorArgumentosInvalidos } = require("../../errors/errorsHandler");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

/**
 * 
 *------------------- ATACHMENT FILE --------------------------
 * This works for Sendgrid Service only
 * 
 * @param {*} ruta Relative Path from file to attach in email 
 * @returns file - Prepared for email sender Service
 */

function generateFileObjectFromPath(rutaDeArchivo) {
  try {
    let fileObject = {};

    let pathToAttachment = rutaDeArchivo;
    attachment = fs.readFileSync(pathToAttachment).toString("base64");
    fileObject.content = attachment;

    const filename = path.basename(rutaDeArchivo);
    fileObject.filename = filename;

    const tipo = mime.getType(rutaDeArchivo);
    fileObject.type = tipo;

    fileObject.disposition = "attachment";
    validFileObject(fileObject);
    return fileObject;
  } catch (error) {
    throw crearErrorArgumentosInvalidos(
      "Creating File Object",
      "error in path file"
    );
  }
}
/**
 *------------------ validate Fields before return File Object ---------------- 
 */
function validFileObject(objeto) {
  let file = {};
  if (!objeto.content) {
    throw crearErrorArgumentosInvalidos("content", "required field");
  }
  if (!objeto.filename) {
    throw crearErrorArgumentosInvalidos("filename", "required field");
  }
  if (!objeto.type) {
    throw crearErrorArgumentosInvalidos("type", "required field");
  }
  if (!objeto.disposition) {
    throw crearErrorArgumentosInvalidos("disposition", "required field");
  }
  file.content = objeto.content;
  file.filename = objeto.filename;
  file.type = objeto.type;
  file.disposition = objeto.disposition;
  return file;
}

module.exports = {
  validFileObject,
  generateFileObjectFromPath,
};
