let { crearErrorArgumentosInvalidos } = require("../../errors/errorsHandler");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

function validFileObject(objeto) {
  let file = {};
  if (!objeto.content) {
    throw crearErrorArgumentosInvalidos("content", "campo requerido");
  }
  if (!objeto.filename) {
    throw crearErrorArgumentosInvalidos("filename", "campo requerido");
  }
  if (!objeto.type) {
    throw crearErrorArgumentosInvalidos("type", "campo requerido");
  }
  if (!objeto.disposition) {
    throw crearErrorArgumentosInvalidos("disposition", "campo requerido");
  }
  file.content = objeto.content;
  file.filename = objeto.filename;
  file.type = objeto.type;
  file.disposition = objeto.disposition;
  return file;
}

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
      "generando File Object",
      "error en ruta de archivo"
    );
  }
}

module.exports = {
  validFileObject,
  generateFileObjectFromPath,
};
