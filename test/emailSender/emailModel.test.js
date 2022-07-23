const assert = require("assert");
const emailExample = require("./examples");
const {
  crearEmailConTextoPlano,
  crearEmailConTextoPlanoYHtml,
  crearEmailConTextoPlanoYHtmlYAttachmentVacio,
  crearEmailConTextoPlanoYHtmlYAttachmentConFiles,
} = require("../../src/emailSender/model/emailModel");

const {
  validFileObject,
} = require("../../src/emailSender/sendGrid/fileObject");

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
            crearEmailConTextoPlano(emailSinAlgunCampo);
          },
          (error) => {
            erroresARecibir.should.matchAny(error.message);
           
            return false;
          }
        );
      }
      for (let i = 0; i < camposInvalidos.length; i++) {
        const element = camposInvalidos[i];
        test(element);
      }
    });
  });

  describe("se crea email sin campo html requerido", () => {
    it("se recibe error de acuerdo al campo faltante", () => {
      assert.throws(
        () => {
          crearEmailConTextoPlanoYHtml(emailExample.sinHtml);
        },
        (error) => {
          const esperado = "html: required field";
          assert.deepStrictEqual(esperado, error.message);
          return true;
        }
      );
    });
  });

  describe("se crea email sin campo attachment requerido", () => {
    it("se recibe error de acuerdo al campo faltante", () => {
      assert.throws(
        () => {
          crearEmailConTextoPlanoYHtmlYAttachmentVacio(
            emailExample.sinAttachment
          );
        },
        (error) => {
          const esperado = "attachments: required field";
          assert.deepStrictEqual(esperado, error.message);
          return true;
        }
      );
    });
  });
  describe("se crea email sin ningún objeto File requerido", () => {
    it("se recibe error de acuerdo al campo faltante", () => {
      const archivosPaths = [];
      assert.throws(
        () => {
          crearEmailConTextoPlanoYHtmlYAttachmentConFiles(
            emailExample.sinNingunFileObject,
            archivosPaths
          );
        },
        (error) => {
          const esperado = "fileObject: required field";
          assert.deepStrictEqual(esperado, error.message);
          return true;
        }
      );
    });
  });

  describe("----PRUEBA MÚLTIPLE:----- se crea objetoFile sin algún required field", () => {
    it("se recibe error de acuerdo al campo faltante", () => {
      const erroresARecibir = [
        "content: required field",
        "filename: required field",
        "type: required field",
        "disposition: required field",
      ];
      const camposInvalidos = [
        emailExample.objetoFileSinContent,
        emailExample.objetoFileSinFilename,
        emailExample.objetoFileSinType,
        emailExample.objetoFileSinDisposition,
      ];
      async function test(objetoFileSinALgunCampo) {
        assert.throws(
          () => {
            validFileObject(objetoFileSinALgunCampo);
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

describe("CON MODELOS DE EMAILS VÁLIDOS", () => {
  describe("se crea email válido con TextoPlano y se recibe lo mismo", () => {
    it("se recibe lo esperado", () => {
      const emailValido = emailExample.validoTextoPlano;
      const emailRecibido = crearEmailConTextoPlano(emailValido);
      assert.deepStrictEqual(emailRecibido, emailValido);
    });
  });

  describe("se crea email válido con Html y se recibe lo mismo", () => {
    it("se recibe lo esperado", () => {
      const emailValido = emailExample.validoTextoPlanoYHtml;
      const emailRecibido = crearEmailConTextoPlanoYHtml(emailValido);
      assert.deepStrictEqual(emailRecibido, emailValido);
    });
  });

  describe("se crea email válido con Attachment y se recibe lo mismo", () => {
    it("se recibe lo esperado", () => {
      const emailValido = emailExample.validoTextoPlanoYHtmlYAttachmentVacio;
      const emailRecibido =
        crearEmailConTextoPlanoYHtmlYAttachmentVacio(emailValido);
      assert.deepStrictEqual(emailRecibido, emailValido);
    });
  });

  describe("se crea objetoFile válido para Attachment y se recibe lo mismo", () => {
    it("se recibe lo esperado", () => {
      const objetoFileValido = emailExample.objetoFileValido;
      const fileObjectRecibido = validFileObject(objetoFileValido);
      assert.deepStrictEqual(fileObjectRecibido, objetoFileValido);
    });
  });
});
